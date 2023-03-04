import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchReactions, updateReaction, selectAllReactions } from "../../features/reactions/reactionSlice"
import axios from "axios"

const ReactionComponent = ({post, user, reactionList}) => {
    const dispatch = useDispatch()
    const postReaction = reactionList.filter((reaction) => reaction.post === post)[0]
    // console.log("Post", post)
    // console.log("ReactionList", reactionList)
    // console.log("PostReaction", postReaction)
    


    let content;
    if(!postReaction){
        return(
            <h3>loading...</h3>
        )
    }

    console.log("Reaction Component Rendered")

    const likeSubmitHandler = async () => {
        dispatch(updateReaction({postId : post, user, type : "like"}))
    }
    const heartSubmitHandler = async () => {
        dispatch(updateReaction({postId : post, user, type : "heart"}))
    }
    const rocketSubmitHandler = async () => {
        dispatch(updateReaction({postId : post, user, type : "rocket"}))
    }
    return(
        <div>
            <button onClick={likeSubmitHandler}>
                <span>Like</span>
                <span>{postReaction.likeCount}</span>
            </button>
            <button onClick={heartSubmitHandler}> 
                <span>Heart</span>
                <span>{postReaction.heartCount}</span>
            </button>
            <button onClick={rocketSubmitHandler}> 
                <span>Rocket</span>
                <span>{postReaction.rocketCount}</span></button>
        </div>
    )
}

export default ReactionComponent