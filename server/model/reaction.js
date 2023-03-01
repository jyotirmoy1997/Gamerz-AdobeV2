import mongoose from "mongoose"

const reactionSchema = new mongoose.Schema({
    likeCount: {
      type: Number,
      default: 0
    },
    rocketCount: {
      type: Number,
      default: 0
    },
    heartCount: {
      type: Number,
      default: 0
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    rockets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    hearts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Posts'
    }
  });

  
const Reactions = mongoose.model("Reactions", reactionSchema)
export default Reactions