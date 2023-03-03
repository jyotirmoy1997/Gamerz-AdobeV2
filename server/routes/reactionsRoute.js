import express from "express"
import { getAllReactions, 
    updateLikes, 
    updateRockets,
    updateHearts,
    createReactions,
    deleteReaction
 } from "../controllers/reactionsController.js"

const reactionRouter = express.Router()


reactionRouter.get("/getAllReactions", getAllReactions)
reactionRouter.post("/createReactions", createReactions)
reactionRouter.patch("/updateLikes", updateLikes)
reactionRouter.patch("/updateRockets", updateRockets)
reactionRouter.patch("/updateHearts", updateHearts)
reactionRouter.delete("/deleteReaction/:id", deleteReaction)


export default reactionRouter