import express from "express"
import { getSingleUser, updateUser, getAllUsers } from "../controllers/userController.js"

const userRouter = express.Router()


userRouter.get('/getAllUsers', getAllUsers)
userRouter.get('/:id', getSingleUser)
userRouter.patch('/updateUser', updateUser)

export default userRouter