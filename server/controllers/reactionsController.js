import Reactions from "../model/reaction.js"

export const getAllReactions = async(req, res) => {
    try {
        const reactions = await Reactions.find({})
        res.status(200).json({reactions})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg : "Something Went Wrong"})
    }

}

export const createReactions = async(req, res) => {
    try {
        const reaction = await Reactions.create(req.body)
     res.status(201).json({reaction})
    } catch (error) {
        console.log(error)
     res.status(404).json({msg : "Something Went Wrong"})
    }
}

export const updateLikes = async (req, res) => {
    console.log("body ",req.body)
    const {post, user} = req.body
    console.log(post, user)
    // res.status(200).json({msg : "Update"})
    try {
        const reactionUser = await Reactions.findOne({post})
        console.log(reactionUser)
        const existingLike = reactionUser.likes.find((likeUser) => likeUser == user)
        if(existingLike){
            const reaction = await Reactions.findOneAndUpdate(
                {post},
                {
                    $pull : {likes : user},
                    $inc : {likeCount : -1}
                },
                {new : true}
                )
         return res.status(200).json({reaction})
        }
    } catch (error) {
        console.log(error)
    }
    try {
        const reaction = await Reactions.findOneAndUpdate(
            {post},
            {
                $push : {likes : user},
                $inc : {likeCount : 1}
            },
            {new : true}
            )
     return res.status(200).json({reaction})
    } catch (error) {
        console.log(error)
     return res.status(404).json({msg : "Something Went Wrong"})
    }
}

export const updateRockets = async (req, res) => {
    const {post, user} = req.body
    try {
        const reactionUser = await Reactions.findOne({post})
        console.log(reactionUser)
        const existingRocket = reactionUser.rockets.find((likeUser) => likeUser == user)
        if(existingRocket){
            const reaction = await Reactions.findOneAndUpdate(
                {post},
                {
                    $pull : {rockets : user},
                    $inc : {rocketCount : -1}
                },
                {new : true}
                )
         return res.status(200).json({reaction})
        }
    } catch (error) {
        console.log(error)
    }
    try {
        const reaction = await Reactions.findOneAndUpdate(
            {post},
            {
                $push : {rockets : user},
                $inc : {rocketCount : 1}
            },
            {new : true}
            )
     return res.status(200).json({reaction})
    } catch (error) {
        console.log(error)
     return res.status(404).json({msg : "Something Went Wrong"})
    }
    // res.status(200).json({msg : "Update"})
}

export const updateHearts = async (req, res) => {
    const {post, user} = req.body
    try {
        const reactionUser = await Reactions.findOne({post})
        console.log(reactionUser)
        const existingHeart = reactionUser.hearts.find((likeUser) => likeUser == user)
        if(existingHeart){
            const reaction = await Reactions.findOneAndUpdate(
                {post},
                {
                    $pull : {hearts : user},
                    $inc : {heartCount : -1}
                },
                {new : true}
                )
            console.log(reaction)
         return res.status(200).json({reaction})
        }
    } catch (error) {
        console.log(error)
    }
    try {
        const reaction = await Reactions.findOneAndUpdate(
            {post},
            {
                $push : {hearts : user},
                $inc : {heartCount : 1}
            },
            {new : true}
            )
        console.log(reaction)
     return res.status(200).json({reaction})
    } catch (error) {
        console.log(error)
    return res.status(404).json({msg : "Something Went Wrong"})
    }

}

export const deleteReaction = async (req, res) => {
    console.log("Hit");
    const { id } = req.params;
    console.log(id)
    // res.send("Okay")
    try {
        const reaction = await Reactions.findOne({ post : id });
        console.log(reaction);
        await reaction.remove();
        res.status(200).json({ msg: "Deleted" });
    } catch (error) {
        res.status(404).json({ msg: "Something Went Wrong" });
    }
};
