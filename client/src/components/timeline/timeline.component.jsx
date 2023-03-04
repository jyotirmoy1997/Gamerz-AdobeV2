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
    
    let content;

    if(userLogStatus === "pending" ){
        // console.log("Fetching Details")
        content = <h2>Loading...</h2>
    }
    else if(userLogStatus === "loggedIn"){
        // console.log("Fetch Done")
        content = 
        <div>
            <UserInfo user={user} />
            <UserPosts 
            userId={user.userId} 
            username={user.name}
        />
        </div>
    // console.log("timeline rendered")
        
    }
    return(
        <div>
            <h1>TimeLine</h1>
            {content}
        </div>
    )
}

export default TimeLine