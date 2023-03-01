import express from "express"
import { getSinglePostReaction, 
    updateLikes, 
    updateRockets,
    updateHearts,
    createReactions,
 } from "../controllers/reactionsController.js"

const reactionRouter = express.Router()


reactionRouter.get("/singleReaction", getSinglePostReaction)
reactionRouter.post("/updateLikes", updateLikes)
reactionRouter.post("/updateRockets", updateRockets)
reactionRouter.post("/updateHearts", updateHearts)

reactionRouter.post("/createReactions", createReactions)

export default reactionRouter