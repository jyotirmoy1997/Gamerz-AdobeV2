import { useSelector, useDispatch } from "react-redux"
import { selectUser, userStatus } from "../../features/user/userSlice"
import UserInfo from "../user-info/user-info.component"
import UserPosts from "../user-posts/userPosts.component"
import { fetchPosts} from "../../features/posts/postSlice"
import { selectAllPosts, postListStatus } from "../../features/posts/postSlice"
import { useEffect, useState } from "react"
import { fetchReactions, selectAllReactions, reactionListStatus } from "../../features/reactions/reactionSlice"
import { Oval } from  'react-loader-spinner'
import "./timeline.styles.css"


const TimeLine = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const userLogStatus = useSelector(userStatus)
    
    let content;

    if(userLogStatus === "pending" ){
        // console.log("Fetching Details")
        content = <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      
      />
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
            {/* <h1>TimeLine</h1> */}
            {content}
        </div>
    )
}

export default TimeLine