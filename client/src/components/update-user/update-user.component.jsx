import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser, selectUser } from "../../features/user/userSlice"
import { convertToBase64 } from "../../utils/base64Converter"
import Button from "../button/button.component"
import defaultDp from "../../../assets/dp.jpg"
import toast, { Toaster } from 'react-hot-toast';
import "./update-user.styles.css"
import { useNavigate } from "react-router"

const notify = () => toast.success('User-info Updated Successfully, Redirecting to Timeline...');

const UpdateUser = () => {
    const [imageFile, setImageFile] = useState('')
    const [formData, setFormData] = useState({
        about : "",
        interests : "",
        profilePicture : ""

    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    console.log(user)

    useEffect(() => {
        if(user){
            setFormData(
                {
                    about : user.about, 
                    interests : user.interests, 
                    profilePicture : user.profilePicture})
        }
    }, [user])

    console.log(formData)

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
        setFormData({...formData, profilePicture: base64File})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(
            {...user, 
            about : formData.about, 
            interests : formData.interests,
            profilePicture : formData.profilePicture
        }))
        notify()
        setTimeout(() => {
            navigate('/user/timeline')
        }, 2000)
    }
    return(
        <div className="user-update-container">
            <div className="user-update-wrapper" >
                <h2>Update Info</h2>
                <form className="post-form" onSubmit={onSubmitHandler}>
                    <img 
                        src={ formData.profilePicture.length > 1 ? formData.profilePicture : defaultDp} 
                        alt=""
                        height={150}
                        width={150}
                        />

                    <input 
                        type="file" 
                        name="" id="update-dp" 
                        accept=".jpg, .png, .jpeg"
                        maxLength={200000}
                        onChange={(e) => handleFileSubmit(e)} required />
                    
                    <label htmlFor="update-dp" id="dp-upload">
                        Update Profile Picture
                    </label>

                    <label>About</label>
                    <input className="el4"
                        type="text" 
                        value={formData.about}
                        onChange={(e) => setFormData({...formData, about : e.target.value})}
                        maxLength={100} required />

                    <label htmlFor="" >Interests</label>

                    <input className="el4"
                        type="text" 
                        value={formData.interests}
                        maxLength={150}
                        onChange={(e) => setFormData({...formData, interests : e.target.value})} required />


                    <Button onClick={onSubmitHandler} content={"Update-Info"} />
                    <Toaster/>
                </form>
            </div>
        </div>
        
    )
}

export default UpdateUser