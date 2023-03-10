import CommentModel from "../model/comment.js"

export const getPostComments = async (req, res) => {
    const { id } = req.params
    try {
        const comments = await CommentModel.find({post : id})
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({msg : "Something Went wrong..."})
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
