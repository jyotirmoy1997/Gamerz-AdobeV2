import express from "express"
import { signIn, signUp, logOut } from "../controllers/authController.js"
import { authenticateUser } from "../middlewares/authentication.js"

const authRouter = express.Router()

// authRouter.get('/sign-in', signIn)
authRouter.post('/sign-in', signIn)
authRouter.post('/sign-up', signUp)
authRouter.post('/logout', logOut)

export default authRouter