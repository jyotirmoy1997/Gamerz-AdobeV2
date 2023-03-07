import UserModel from "../model/user.js"
import { StatusCodes } from "http-status-codes"
import { createJWT, attachCookiesToResponse } from "../utils/JWT.js"
import { createTokenUser } from "../utils/createTokenUser.js"

export const signIn = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    const user = await UserModel.findOne({email})
    console.log(user)
    if(!user){
        return res.status(404).json({msg : "User doesn't exist"})
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        res.status(404).json({msg : "Wrong Password"})
    }
    else{

        console.log(user)
        // res.status(200).json(user)
        const tokenUser = createTokenUser(user)
        // const token = createJWT({payload : tokenUser})
        attachCookiesToResponse(res, tokenUser)
        res.status(200).json({user : tokenUser})
    }
}

export const signUp = async (req, res) => {
    const {name, email, password } = req.body
    console.log(email)

    const existingEmail = await UserModel.findOne({email})
    console.log(existingEmail)
    if(existingEmail){
        return res.status(400).json({msg : "User already exists", status : StatusCodes.BAD_REQUEST})
    }
    try {
        const newUser = await UserModel.create({name, email, password})
        console.log(newUser)
        const token = createJWT({payload : newUser.toObject()})
        return res.status(201).json({ msg : "Sign-Up Successful", user : newUser, token })
    } catch (error) {
        console.log(error)
        res.status(400).json({msg : "Something went wrong"})
    }
}

export const logOut = (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(200).json({ msg: "Logged Out" });
  };