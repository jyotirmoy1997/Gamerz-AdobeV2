import { deletePost} from "../../features/posts/postSlice"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { selectAllPosts, postListStatus, fetchPosts } from "../../features/posts/postSlice"
import { selectAllReactions, reactionListStatus, fetchReactions } from "../../features/reactions/reactionSlice"
import "./userPosts.styles.css"
import { useEffect, useState } from "react"
import ReactionComponent from "../reactions/reaction.component"

const UserPosts = ({userId, username}) => {
    const dispatch = useDispatch()
    const postList = useSelector(selectAllPosts)
    const postStatus = useSelector(postListStatus)
    const reactionList = useSelector(selectAllReactions)
    const reactionsStatus = useSelector(reactionListStatus)

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchReactions())
    }, [])
    
    const navigate = useNavigate()
    
    

    

    // const [isDeleted, setIsDeleted] = useState(false);
      
    const updatePostHandler = (postId) => {
        console.log(postId)
        navigate(`/posts/${postId}`)
    }

    
    const deletePostHandler = (postId) => {
        const res = confirm("Do you sure want to delete this post ?")
        if(res){
            dispatch(deletePost(postId, {dispatch}))
            // setIsDeleted(true);
        }
    }

    let content;
    if(postStatus === "pending" && reactionsStatus === "pending"){
        console.log("Pending")
        content = <h2>Loading...</h2>
    }
    else if(postStatus === "succeded" && reactionsStatus === "succeded"){
        const userPosts = postList.filter((post) => post.creator === userId) 
        content = <div className="post-wrapper">
            {
                userPosts.map((post) => {
                    return(
                        <div className="single-post" key={post._id}>
                            <h3>{post.title}</h3>
                            <h4>{username}</h4>
                            <h5>{post.message}</h5>
                            <img src={post.image} alt="" srcSet="" height={200} width={300} />
                            <ReactionComponent 
                            post={post._id} 
                            user={post.creator}
                            reactionList={reactionList}
                            />
                            <button onClick={() => updatePostHandler(post._id)}>Update</button>
                            <button onClick={() => deletePostHandler(post._id)}>Delete</button>
                        </div>
                    )
                })
            }
            </div>
        }

    return(
        <div>
            {content}
        </div>
        
    )
}

export default UserPosts
