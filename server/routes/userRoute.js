import express from "express"
import { getSingleUser, updateUser } from "../controllers/userController.js"

const userRouter = express.Router()

// userRouter.get('/sign-in', signIn)
userRouter.get('/:id', getSingleUser)
userRouter.patch('/updateUser', updateUser)
// userRouter.post('/sign-up', signUp)

export default userRouter