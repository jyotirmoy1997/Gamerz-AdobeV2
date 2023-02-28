import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewPost } from "../../features/posts/postSlice"
import axios from "axios"
import "./form.styles.css"

const Form = ({userId}) => {
    const [formData, setFormData] = useState({
        creator : userId,
        title : "",
        message : ""
    })
    const dispatch = useDispatch()

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log("Form Data ", formData)
        dispatch(addNewPost({...formData}))
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

export default Form