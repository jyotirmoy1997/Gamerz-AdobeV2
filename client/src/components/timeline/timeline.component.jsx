import { useSelector, useDispatch } from "react-redux"
import { selectUser, userStatus } from "../../features/user/userSlice"
import UserInfo from "../user-info/user-info.component"
import UserPosts from "../user-posts/userPosts.component"
import { fetchPosts} from "../../features/posts/postSlice"
import { selectAllPosts, postListStatus } from "../../features/posts/postSlice"
import { useEffect, useState } from "react"
import { fetchReactions, selectAllReactions, reactionListStatus } from "../../features/reactions/reactionSlice"

const TimeLine = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const userLogStatus = useSelector(userStatus)
    const postList = useSelector(selectAllPosts)
    const postStatus = useSelector(postListStatus)
    const reactionList = useSelector(selectAllReactions)
    const reactionsStatus = useSelector(reactionListStatus)
    
    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchReactions())
    }, [dispatch])

    

    let content;

    

    if(userLogStatus === "pending" && postStatus === "pending" && reactionsStatus === "pending"){
        console.log("Fetching Details")
        content = <h2>Loading...</h2>
    }
    else if(userLogStatus === "loggedIn" && postStatus === "succeded" && reactionsStatus === "succeded"){
        console.log("Timeline", user, postList, reactionList)
        content = 
        <div>
            <UserInfo user={user} />
            <UserPosts 
                userId={user.userId} 
                username={user.name}
                postList={postList}
                reactionList={reactionList}
                />
        </div>
        
    }
    
    // console.log(user)
    return(
        <div>
            <h1>TimeLine</h1>
            {content}
        </div>
    )
}

export default TimeLine