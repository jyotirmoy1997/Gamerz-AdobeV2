import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import connectDB from "./db/connect.js"
import dotenv from "dotenv"
import postRouter from "./routes/postsRoute.js"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoute.js"
import reactionRouter from "./routes/reactionsRoute.js"
import morgan from "morgan"
import cookieParser from "cookie-parser"

dotenv.config()

const server = express()


// Middlewares
server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}));
server.use(cors({ credentials: true, origin: true }))
server.use(morgan('tiny'))
server.use(cookieParser(process.env.JWT_SECRET))


server.get("/", (req, res) => {
    // console.log(req.headers.cookie)
    res.send("This is the Home Route")
})


server.use('/api/v1/posts', postRouter)
server.use('/api/v1/auth', authRouter)
server.use('/api/v1/users', userRouter)
server.use('/api/v1/reactions', reactionRouter)

const PORT = process.env.PORT || 5000


server.listen(5000, async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Successfully connected to Database...")
        console.log(`Listening to Port ${PORT}...`)
    } catch (error) {
        console.log(error)
    }
})