import { deletePost} from "../../features/posts/postSlice"
import { useNavigate } from "react-router"
import ReactionComponent from "../reactions/reaction.component"
import "./userPosts.styles.css"



const UserPosts = ({userId, username, postList, reactionList}) => {
    const navigate = useNavigate()

    const userPosts = postList.filter((post) => post.creator === userId) 

    const updatePostHandler = (postId) => {
        console.log(postId)
        navigate(`/posts/${postId}`)
    }

    const deletePostHandler = (postId) => {
        const res = confirm("Do you sure want to delete this post ?")
        if(res){
            dispatch(deletePost(postId, {dispatch}))
        }
        // navigate(`/posts/${postId}`)
    }

    return(
        <div className="post-wrapper">
            {
                userPosts.map((post) => {
                    const postReaction = reactionList.filter((reaction) => reaction.post === post._id)[0]
                    console.log("Post Reaction", postReaction)
                    return(
                        <div className="single-post" key={post._id}>
                            <h3>{post.title}</h3>
                            <h4>{username}</h4>
                            <h5>{post.message}</h5>
                            <ReactionComponent 
                            post={post._id} 
                            user={post.creator}
                            postReaction={postReaction}
                            />
                            <button onClick={() => updatePostHandler(post._id)}>Update</button>
                            <button onClick={() => deletePostHandler(post._id)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserPosts