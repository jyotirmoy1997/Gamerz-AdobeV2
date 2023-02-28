import mongoose from "mongoose"
import PostMessage from "../model/postMessage.js"


// Get all the Posts
export const getPosts =  async (req, res) => {
    try {
        const posts = await PostMessage.find({})
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message : "Something Went Wrong !"})
    }   
}


// // Get Posts for a single user
// export const getSingleUserPost =  async (req, res) => {
//     const {id} = req.params
//     console.log(id)
//     res.send("Reach")
//     // try {
//     //     const posts = await PostMessage.find({_id : id})
//     //     res.status(200).json(posts)
//     // } catch (error) {
//     //     res.status(404).json({ message : "Something Went Wrong !"})
//     // }   
// }



// Create a post
export const createPost = async (req, res) => {
    console.log(req.body)
    try {
        const post = await PostMessage.create({...req.body})
        res.status(201).json(post)
    } catch (error) {
        res.status(409).json({ message : "Something Went Wrong !"})
    }
}

// Update a post
export const updatePost = async (req, res) => {
    const { id : _id} = req.params
    console.log(req.params, req.body)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({msg : "No Posts Found"})
    }
    try{
        const updatedPost = await PostMessage.findOneAndUpdate({_id : _id}, req.body, {new : true});
        res.status(200).json(updatedPost)
    }
    catch{
        res.status(409).json({ message : "Something Went Wrong !"})
    }
}


// Delete a post
export const deletePost = async (req, res) => {
    const { id : _id} = req.params
    console.log(_id)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({msg : "No Posts Found"})
    }
    try{
        await PostMessage.findOneAndDelete({_id : _id});
        res.status(200).json({msg : "Post Deleted Successfully"})
    }
    catch{
        res.status(409).json({ message : "Something Went Wrong !"})
    }
}