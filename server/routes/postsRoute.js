import express from "express"
import { getPosts, createPost, updatePost, deletePost} from "../controllers/postsController.js"

const postRouter = express.Router()

postRouter.get('/', getPosts)
postRouter.post('/', createPost)
postRouter.patch('/:id', updatePost)
postRouter.delete('/:id', deletePost)

export default postRouter