import express from "express"
import { getPostComments, addNewComment } from "../controllers/commentController.js"

const commentRouter = express.Router()


commentRouter.get('/:id', getPostComments)
commentRouter.post('/addNewComment', addNewComment)

export default commentRouter