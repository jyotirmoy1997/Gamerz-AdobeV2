import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewPost } from "../../features/posts/postSlice"
import { fetchReactions } from "../../features/reactions/reactionSlice"
import axios from "axios"
import "./post.styles.css"

function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

const Post = ({creator, username}) => {
    const [imageFile, setImageFile] = useState('')
    const [formData, setFormData] = useState({
        creatorName : username,
        creatorId : creator,
        title : "",
        message : "",
        image : ""
    })
    
    const dispatch = useDispatch()

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log("Form Data ", formData)
        dispatch(addNewPost({...formData},{dispatch}))
        dispatch(fetchReactions())

    }

    const handleFileSubmit = async (event) => {
        const file = event.target.files[0]
        const base64File = await convertToBase64(file)
        setImageFile(base64File)
        setFormData({...formData, image: base64File})
    }
    return(
        <div className="post-wrapper" >
            <h2>Share your Thoughts !</h2>
            <form className="post-form">
                <label htmlFor="">Title</label>
                <input className="el4"
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title : e.target.value})} />
                <label htmlFor="">Message</label>

                <input className="el4"
                    type="text" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message : e.target.value})} />

                <input 
                    type="file" 
                    name="" id="file" 
                    accept=".jpg, .png, .jpeg"
                    maxLength={200000}
                    onChange={(e) => handleFileSubmit(e)} />

                <button onClick={onSubmitHandler}>Post</button>
            </form>
        </div>
    )
}

export default Post