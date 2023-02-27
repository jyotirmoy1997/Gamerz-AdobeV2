import "./sign-in.form.styles.css"
import Button from "../button/button.component"
import GoogleButton from "react-google-button"
import { useState } from "react"
import axios from "axios"
// axios.defaults.withCredentials = true;

const initialState = {
    email : '',
    password : ''
}

const SignInForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [errorMessage, setErrorMessage] = useState(null)

    const onChangeHandler = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/sign-in', 
            {...formData}, 
            { withCredentials: true })
            console.log(response)
            
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