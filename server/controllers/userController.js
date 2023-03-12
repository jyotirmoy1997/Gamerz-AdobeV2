import mongoose from "mongoose"
import UserModel from "../model/user.js"
import { createTokenUser } from "../utils/createTokenUser.js"

export const getAllUsers = async (req, res) => {
    console.log("Hit")
    try {
        const allUsers = await UserModel.find({})
        console.log(allUsers)
        const users = allUsers.reduce((acc, {_id, name, profilePicture}) => {
            acc[_id] = {name, profilePicture};
            return acc;
          }, {});
        console.log(users)
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.send("Something Went wrong")
    }
    
}

export const getSingleUser = async (req, res) => {
    const { id : _id } = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.send("Not a valid Id")
    }
    try {
        const user = await UserModel.findById(_id)
        if(!user){
            return res.status(404).json({msg : "User Not Found"})
        }
        console.log(user)
        res.status(200).json({user : user})
    } catch (error) {
        console.log(error)
        res.send("Something Went wrong")
    }
    
}

export const updateUser = async (req, res) => {
    const {userId} = req.body
    try {
        // console.log(re)
        const updatedUser = await UserModel.findOneAndUpdate({_id : userId}, req.body, {new : true})
        // console.log(updatedUser)
        const user = createTokenUser(updatedUser)
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg : "Something Went wrong"})
    }
}