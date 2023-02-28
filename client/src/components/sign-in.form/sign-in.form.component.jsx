import "./sign-in.form.styles.css"
import Button from "../button/button.component"
import GoogleButton from "react-google-button"
import { useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../features/user/userSlice"
import { useNavigate } from "react-router"
import { signInUser } from "../../features/user/userSlice"
// axios.defaults.withCredentials = true;

const initialState = {
    email : '',
    password : ''
}

const SignInForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const onChangeHandler = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log(formData)
        try {
            dispatch(signInUser(formData))
            navigate('/user/timeline')
            
        } catch (error) {
            console.log(error)
            // setErrorMessage(error.response.data.msg)
        }
    }
    return(
        <div >
            <form className="wrapper-sign-in" action="" onSubmit={onSubmitHandler}>
                <div className="el1">I already have an account</div>
                <div className="el2">Sign-In with your email and password</div>
                <div className="el3">Email</div>
                <input className="el4" 
                type="email" 
                name="email" 
                onChange={onChangeHandler} required />
                <div className="el5">Password</div>
                <input className="el6" 
                type="password" 
                name="password" 
                onChange={onChangeHandler} required />
                <Button onClick={onSubmitHandler} className="el7" content={"Sign-In"} />
                
                {/* <button className="el7">Sign-In</button> */}
                {/* <GoogleButton className="el8" /> */}
            </form>
            
        </div>
    )
}

export default SignInForm