import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts } from "../../features/posts/postSlice"
import { selectAllReactions } from "../../features/reactions/reactionSlice"
import { selectUser } from "../../features/user/userSlice"
import Button from "../button/button.component"
import { addNewComment } from "../../features/comments/commentSlice"
import ShowReactions from "../show-reactions/show-reactions.component"
import "./show-full-post.styles.css"
import { useEffect, useState } from "react"
import { fetchComments, selectAllComments } from "../../features/comments/commentSlice"
import ShowComments from "../show-comments/show-comments.component"


const ShowFullPost = () => {
    const [comment, setComment] = useState('')
    const {postId} = useParams()
    const postList = useSelector(selectAllPosts)
    const user = useSelector(selectUser)
    const postToShow = postList.find((post) => post._id === postId)
    const reactionList = useSelector(selectAllReactions)
    const comments = useSelector(selectAllComments).filter((comment) => comment.postId === postId)
    const reactionToShow = reactionList.filter((reaction) => reaction.post === postId)[0]
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchComments())
    }, [])
    
    if(!postToShow){
        return(
            <h1>Invalid Post Id</h1>
        )
    }
    const onCommentSubmitHandler = (e) => {
        e.preventDefault()
        if(comment.length > 1){
            dispatch(addNewComment({postId : postToShow._id, comment, userId : user.userId}))
        }
        else{
            alert("Comment Cannot be Empty")
        }
    }
    return(
        <div className="full-post-container">
            <div className="fullpost-wrapper">
                <div className="fullpost-wrapper-l1">
                    <img id="post-image" src={postToShow.image} alt="" />
                    <div className="fullpost-wrapper-inner">
                        <h3 id="post-creator">{postToShow.creatorName}</h3>
                        <h3 id="post-title">{postToShow.title}</h3>
                        <h5 id="post-message">{postToShow.message}</h5>
                    </div>
                </div>
                <div className="fullpost-wrapper-l2" >
                    <ShowReactions id="show-reactions" reaction={reactionToShow}/>
                    <ShowComments id="show-comment" comments={comments} />
                    <form action="" method="post">
                        Post a Comment
                        <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} maxLength={150} />
                        <Button onClick={onCommentSubmitHandler} content={"Post Comment"}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShowFullPost