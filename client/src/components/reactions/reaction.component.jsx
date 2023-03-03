import { useSelector, useDispatch } from "react-redux"
import { fetchReactions } from "../../features/reactions/reactionSlice"
import axios from "axios"

const ReactionComponent = ({post, user, postReaction}) => {
    console.log("Post reaction ", postReaction)
    // console.log(post, user)
    const likeSubmitHandler = async () => {
        const response = await axios.patch("http://localhost:5000/api/v1/reactions/updateLikes", {
            post,
            user
        })
        console.log(response)
    }
    const heartSubmitHandler = async () => {
        const response = await axios.patch("http://localhost:5000/api/v1/reactions/updateHearts", {
            post,
            user
        })
        console.log(response)
    }
    const rocketSubmitHandler = async () => {
        const response = await axios.patch("http://localhost:5000/api/v1/reactions/updateRockets", {
            post,
            user
        })
        console.log(response)
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