import { useSelector, useDispatch } from "react-redux"
import { fetchPosts, deletePost} from "../../features/posts/postSlice"
import { selectAllPosts } from "../../features/posts/postSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { selectUser } from "../../features/user/userSlice"
import axios from "axios"


const NewsFeed = ({userId}) => {
    const postList = useSelector(selectAllPosts)
    const {user} = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const userNewsFeedPosts = postList.filter((post) => post.creator !== user.userId)

    return(
        <div>
            {
                userNewsFeedPosts.map((post) => {
                    return(
                        <div key={post._id}>
                            <h3>{post.title}</h3>
                            <h4>{post.creator}</h4>
                            <h5>{post.message}</h5>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NewsFeed