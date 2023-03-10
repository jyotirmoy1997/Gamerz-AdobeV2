import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts } from "../../features/posts/postSlice"
import { selectAllReactions } from "../../features/reactions/reactionSlice"
import ShowReactions from "../show-reactions/show-reactions.component"
import "./show-full-post.styles.css"

const ShowFullPost = () => {
    const {postId} = useParams()
    const postList = useSelector(selectAllPosts)
    const postToShow = postList.find((post) => post._id === postId)
    const reactionList = useSelector(selectAllReactions)
    const reactionToShow = reactionList.filter((reaction) => reaction.post === postId)[0]
    if(!postToShow){
        return(
            <h1>Invalid Post Id</h1>
        )
    }
    console.log(postToShow)
    console.log(reactionToShow)
    return(
        <div className="fullpost-wrapper">
            <h1>Show Full Post</h1>
            <img src={postToShow.image} alt="" />
            <ShowReactions reaction={reactionToShow}/>
            {/* <h3>{postToShow.creatorName}</h3>
            <h3>{postToShow.title}</h3>
            <h3>{postToShow.message}</h3>
            <div>Comment List</div> */}
        </div>
        
    )
}

export default ShowFullPost