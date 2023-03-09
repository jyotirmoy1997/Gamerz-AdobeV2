import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllPosts, postListStatus, fetchPosts } from "../../features/posts/postSlice"
import { selectAllReactions, reactionListStatus, fetchReactions } from "../../features/reactions/reactionSlice"
import "./userPosts.styles.css"

import PostCard from "../post-card/post-card.component"

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
    

    let content;
    if(postStatus === "pending" && reactionsStatus === "pending"){
        // console.log("Pending")
        content = <h2>Loading...</h2>
    }
    else if(postStatus === "succeded" && reactionsStatus === "succeded"){
        const userPosts = postList.filter((post) => post.creatorId === userId)
        // console.log("User Posts", userPosts)
        content = <div className="user-post-wrapper">
            {
                userPosts.map((post) => {
                    return(
                        <PostCard 
                            key={post._id} 
                            post={post} 
                            username={username} 
                            reactionList={reactionList} 
                        />
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
