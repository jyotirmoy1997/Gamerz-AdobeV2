import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts } from "../../features/posts/postSlice"
import { updatePost, deletePost } from "../../features/posts/postSlice"
import { useNavigate } from "react-router"
import toast, { Toaster } from 'react-hot-toast';

const redirectUpdate = () => toast.success('Post Updated Successfully, Redirecting to Timeline...');
const redirectDelete = () => toast.success('Post Deleted Successfully, Redirecting to Timeline...');

const UpdatePost = () => {
    const [formData, setFormData] = useState({
        creator: "",
        title: "",
        message: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { postId } = useParams()

    const postList = useSelector(selectAllPosts)
    const postToUpdate = postList.find((post) => post._id === postId)

    useEffect(() => {
        if (postToUpdate) {
            setFormData({
                creator: postToUpdate.creator,
                title: postToUpdate.title,
                message: postToUpdate.message
            })
        }
    }, [postToUpdate])

    const updatePostHandler = (e) => {
        e.preventDefault()
        dispatch(updatePost({postId, formData}))
        redirectUpdate()
        setTimeout(() => {
            navigate('/user/timeline')
        }, 1500)
    }

    const deletePostHandler = (e) => {
        e.preventDefault()
        const res = confirm("Do you sure want to delete this post ?")
        console.log(res)
        if(res){
            dispatch(deletePost(postId, {dispatch}))
            redirectDelete()
            setTimeout(() => {
                navigate('/user/timeline')
            }, 1500)
        }
    }

    return (
        <div className="form-wrapper">
            <h2>Share your Thoughts !</h2>
            <form>
                <label htmlFor="">Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <label htmlFor="">Message</label>
                <input
                    type="text"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <button onClick={updatePostHandler}>Update Post</button>
                <button onClick={deletePostHandler}>Delete Post</button>
                <Toaster />
            </form>
        </div>
    )
}

export default UpdatePost
