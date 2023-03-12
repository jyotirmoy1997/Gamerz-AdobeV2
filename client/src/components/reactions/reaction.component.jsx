import { useDispatch } from "react-redux"
import { AiFillLike, AiFillHeart } from 'react-icons/ai';
import { BsRocketTakeoffFill } from 'react-icons/bs';
import { updateReaction } from "../../features/reactions/reactionSlice"
import "./reaction.styles.css"



const ReactionComponent = ({post, user, reactionList}) => {
    const dispatch = useDispatch()
    const postReaction = reactionList.filter((reaction) => reaction.post === post)[0]

    if(!postReaction){
        return(
            <h3>loading...</h3>
        )
    }

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
        <div className="reaction-wrapper">
            <button className="rc-btn" onClick={likeSubmitHandler}>
                <AiFillLike size={30}/>
                <span>{postReaction.likeCount}</span>
            </button>
            <button className="rc-btn" onClick={heartSubmitHandler}> 
                <AiFillHeart size={30}/>
                <span>{postReaction.heartCount}</span>
            </button>
            <button className="rc-btn" onClick={rocketSubmitHandler}> 
                <BsRocketTakeoffFill size={30}/>
                <span>{postReaction.rocketCount}</span></button>
        </div>
    )
}

export default ReactionComponent