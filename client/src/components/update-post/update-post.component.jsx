import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts } from "../../features/posts/postSlice"
import { updatePost, deletePost } from "../../features/posts/postSlice"
import { useNavigate } from "react-router"
import toast, { Toaster } from 'react-hot-toast';
import { convertToBase64 } from "../../utils/base64Converter"
import fileUploadIcon from "./assets/upload.png"
import { AiFillDelete } from 'react-icons/ai';
import { selectUser } from "../../features/user/userSlice"
import "./update-post.styles.css"

import { GrDocumentUpdate } from 'react-icons/gr';

const redirectUpdate = () => toast.success('Post Updated Successfully, Redirecting to Timeline...');
const redirectDelete = () => toast.success('Post Deleted Successfully, Redirecting to Timeline...');

const UpdatePost = () => {
    const [imageFile, setImageFile] = useState('')
    const [titleError, setTitleError] = useState('')
    const [messageError, setMessageError] = useState('')
    const [formData, setFormData] = useState({
        creatorName : "",
        creatorId : "",
        title : "",
        message : "",
        image : ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { postId } = useParams()

    const postList = useSelector(selectAllPosts)
    const userId = useSelector(selectUser).userId
    console.log(userId)
    const postToUpdate = postList.find((post) => post._id === postId)

    if(userId !== postToUpdate.creatorId){
        return(
            <div>You are not allowed to access this route</div>
        )
    }

    console.log(postToUpdate)

    useEffect(() => {
        if (postToUpdate) {
            setFormData({
                creatorName : postToUpdate.creatorName,
                creatorId : postToUpdate.creatorId,
                title: postToUpdate.title,
                message: postToUpdate.message,
                image : postToUpdate.image
            })
        }
    }, [postToUpdate])

    const handleFileSubmit = async (event) => {
        const file = event.target.files[0]
        console.log(file)
        if(file.size > 200000){
            alert("File Size is too Big...Please upload files with smaller size")
            setImageFile('')
            return
        }
        const base64File = await convertToBase64(file)
        setImageFile(base64File)
        setFormData({...formData, image: base64File})
    }

    const updatePostHandler = (e) => {
        e.preventDefault()
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
        <div className="up-outer">
            <div className="update-post-wrapper" >
            <h2>Update Your Post</h2>
            <form className="update-post-form" >
                <label id="update-post-title" htmlFor="" data={titleError} >Title</label>
                <input className="el4"
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title : e.target.value})}
                    maxLength={50} required />

                <label id="update-post-message" htmlFor="" data={messageError} >Message</label>

                <input className="el4"
                    type="text" 
                    value={formData.message}
                    maxLength={150}
                    onChange={(e) => setFormData({...formData, message : e.target.value})} required />

                <img src={formData.image} alt="" />
                <input 
                    type="file" 
                    name="" id="update-file" 
                    accept=".jpg, .png, .jpeg"
                    maxLength={200000}
                    onChange={(e) => handleFileSubmit(e)} required />

                <label htmlFor="">Attach Image</label>
                
                <label htmlFor="update-file" id="update-file-upload">
                    <span>
                        <img src={fileUploadIcon} alt="" height="50px" width="50px"/>
                    </span>
                    <span>Choose a File</span>
                </label>

                <div id="up-btn-container">
                    <button onClick={updatePostHandler} id="up-btn">
                        <GrDocumentUpdate size={30} />
                    </button>
                    <button onClick={deletePostHandler} id="dlt-btn">
                        <AiFillDelete size={30} />
                    </button>
                </div>
                <Toaster/>
            </form>
        </div>
        </div>
        
    )
}

export default UpdatePost
