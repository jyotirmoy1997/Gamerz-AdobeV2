import CommentModel from "../model/comment.js"
import mongoose from "mongoose"

export const getPostComments = async (req, res) => {
    const { id } = req.params
    try {
        const comments = await CommentModel.find({post : id})
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({msg : "Something Went wrong..."})
    }
}

// Delete a Comment
export const deleteComment = async (req, res) => {
    const { id : _id} = req.params
    console.log(_id)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({msg : "No Posts Found"})
    }
    try{
        await CommentModel.findOneAndDelete({_id : _id});
        res.status(200).json({msg : "Post Deleted Successfully"})
    }
    catch{
        res.status(409).json({ message : "Something Went Wrong !"})
    }
}

export const addNewComment = async (req, res) => {
    console.log(req.body)
    try {
        const newComment = await CommentModel.create({...req.body})
        res.status(201).json(newComment)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : "Something Went wrong..."})
    }
}
