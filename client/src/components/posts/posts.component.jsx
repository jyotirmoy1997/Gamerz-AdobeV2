import { useSelector, useDispatch } from "react-redux"
import { fetchPosts, deletePost } from "../../features/posts/postSlice"
import { selectAllPosts } from "../../features/posts/postSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"


const Posts = () => {
    const postList = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    // console.log("Postlists",postList)

    // useEffect(() => {
    //     axios.get("http://localhost:5000/api/v1/posts").then((res) => console.log(res.data))
    // })

    const updatePostHandler = (postId) => {
        console.log(postId)
        navigate(`/posts/${postId}`)
    }

    const deletePostHandler = (postId) => {
        const res = confirm("Do you sure want to delete this post ?")
        if(res){
            dispatch(deletePost(postId))
        }
        // navigate(`/posts/${postId}`)
    }

    return(
        <div>
            {
                postList.map((post) => {
                    return(
                        <div key={post._id}>
                            <h3>{post.title}</h3>
                            <h4>{post.creator}</h4>
                            <h5>{post.message}</h5>
                            <button onClick={() => updatePostHandler(post._id)}>Update</button>
                            <button onClick={() => deletePostHandler(post._id)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Posts