import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comment : {
        type : String,
        default : ""
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Posts'
    }
})

const Comment = mongoose.model("Comments", commentSchema)

export default Comment