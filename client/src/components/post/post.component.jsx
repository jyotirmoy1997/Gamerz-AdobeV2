import { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "../button/button.component"
import { convertToBase64 } from "../../utils/base64Converter"
import { addNewPost } from "../../features/posts/postSlice"
import { fetchReactions } from "../../features/reactions/reactionSlice"
import "./post.styles.css"
import fileUploadIcon from "./assets/upload.png"



const Post = ({creator, username}) => {
    const [titleError, setTitleError] = useState('')
    const [messageError, setMessageError] = useState('')
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
        if(formData.title.length < 1 && formData.message.length >= 1){
            setTitleError('*Title Cannot be Empty')
            setMessageError('')
            return
        }
        else if(formData.title.length >= 1 && formData.message.length < 1){
            setTitleError('')
            setMessageError('*Message Cannot be Empty')
            return
        }
        else if(formData.title.length < 1 && formData.message.length < 1){
            setTitleError('*Title Cannot be Empty')
            setMessageError('*Message Cannot be Empty')
            return
        }
        if(formData.image.length < 1){
            alert("Please select a file")
            return
        }
        console.log("Form Data ", formData)
        dispatch(addNewPost({...formData},{dispatch}))
        dispatch(fetchReactions())

    }

    const handleFileSubmit = async (event) => {
        const file = event.target.files[0]
        console.log(file)
        if(file.size > 200000){
            alert("File Size is too Big...Please upload files with smaller size")
            return
        }
        const base64File = await convertToBase64(file)
        setFormData({...formData, image: base64File})
    }
    return(
        <div className="post-wrapper" >
            <h2>Share your Thoughts !</h2>
            <form className="post-form" onSubmit={onSubmitHandler}>
                <label id="post-title" htmlFor="" data={titleError} >Title</label>
                <input className="el4"
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title : e.target.value})}
                    maxLength={50} required />

                <label id="post-message" htmlFor="" data={messageError} >Message</label>

                <input className="el4"
                    type="text" 
                    value={formData.message}
                    maxLength={150}
                    onChange={(e) => setFormData({...formData, message : e.target.value})} required />

                <input 
                    type="file" 
                    name="" id="file" 
                    accept=".jpg, .png, .jpeg"
                    maxLength={200000}
                    onChange={(e) => handleFileSubmit(e)} required />

                <label htmlFor="">Attach Image</label>
                
                <label htmlFor="file" id="file-upload">
                    <span>
                        <img src={fileUploadIcon} alt="" height="50px" width="50px"/>
                    </span>
                    <span>Choose a File</span>
                </label>

                <Button onClick={onSubmitHandler} content={"Post"} />
            </form>
        </div>
    )
}

export default Post