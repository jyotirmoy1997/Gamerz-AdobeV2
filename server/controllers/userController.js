import mongoose from "mongoose"
import UserModel from "../model/user.js"

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