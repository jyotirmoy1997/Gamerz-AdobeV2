import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comment : {
        type : String,
        default : ""
    }
})

const Comment = mongoose.model("Comments", commentSchema)

export default Comment