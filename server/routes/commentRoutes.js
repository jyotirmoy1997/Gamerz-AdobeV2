import express from "express"
import { getPostComments, addNewComment, deleteComment } from "../controllers/commentController.js"

const commentRouter = express.Router()

commentRouter.post('/addNewComment', addNewComment)
commentRouter.delete('/:id', deleteComment)
commentRouter.get('/:id', getPostComments)


export default commentRouter