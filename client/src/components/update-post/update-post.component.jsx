import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts } from "../../features/posts/postSlice"
import { updatePost } from "../../features/posts/postSlice"

const UpdatePost = () => {
    const [formData, setFormData] = useState({
        creator: "",
        title: "",
        message: ""
    })
    const dispatch = useDispatch()

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
    }

    return (
        <div className="form-wrapper">
            <h2>Share your Thoughts !</h2>
            <form>
                <label htmlFor="">Creator</label>
                <input
                    type="text"
                    value={formData.creator}
                    onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                />
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
            </form>
        </div>
    )
}

export default UpdatePost
