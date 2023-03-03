import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewPost } from "../../features/posts/postSlice"
import { fetchReactions } from "../../features/reactions/reactionSlice"
import axios from "axios"
import "./post.styles.css"

const Post = ({creator}) => {
    const [formData, setFormData] = useState({
        creator : creator,
        title : "",
        message : ""
    })
    const dispatch = useDispatch()

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log("Form Data ", formData)
        dispatch(addNewPost({...formData},{dispatch}))
        dispatch(fetchReactions())

    }
    return(
        <div className="form-wrapper">
            <h2>Share your Thoughts !</h2>
            <form>
                {/* <label htmlFor="" >Creator</label>
                <input 
                    type="text" 
                    value={formData.creator} 
                    onChange={(e) => setFormData({...formData, creator : e.target.value})} 
                /> */}
                <label htmlFor="">Title</label>
                <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title : e.target.value})} />
                <label htmlFor="">Message</label>

                <input 
                    type="text" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message : e.target.value})} />
                <button onClick={onSubmitHandler}>Post</button>
            </form>
        </div>
    )
}

export default Post