import express from "express"
import { getSingleUser } from "../controllers/userController.js"

const userRouter = express.Router()

// userRouter.get('/sign-in', signIn)
userRouter.get('/:id', getSingleUser)
// userRouter.post('/sign-up', signUp)

export default userRouter