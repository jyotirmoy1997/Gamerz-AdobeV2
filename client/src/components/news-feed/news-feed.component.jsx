import { useSelector, useDispatch } from "react-redux"
import { fetchPosts, deletePost} from "../../features/posts/postSlice"
import { selectAllPosts } from "../../features/posts/postSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { selectUser } from "../../features/user/userSlice"
import { fetchReactions } from "../../features/reactions/reactionSlice"
import { selectAllReactions } from "../../features/reactions/reactionSlice"
import ReactionComponent from "../reactions/reaction.component"

import axios from "axios"


const NewsFeed = () => {
    const user = useSelector(selectUser)
    const postList = useSelector(selectAllPosts)
    const reactionList = useSelector(selectAllReactions)

    const userNewsFeedPosts = postList.filter((post) => post.creator !== user.userId)
    
    console.log("Newd Feed", userNewsFeedPosts)
    return(
        <div>
            {
                userNewsFeedPosts.map((post) => {
                    return(
                        <div key={post._id}>
                            <h3>{post.title}</h3>
                            <h4>{post.creator}</h4>
                            <h5>{post.message}</h5>
                            {/* <ReactionComponent 
                                post={post._id}
                                user={user.userId}
                            /> */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NewsFeed