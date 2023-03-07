import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    image : String,
    createdAt : {
        type : Date,
        default : new Date()
    }
})
const PostMessage = mongoose.model("Posts", PostSchema)
export default PostMessage