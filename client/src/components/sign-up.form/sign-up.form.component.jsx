import { useState } from "react"
import Button from "../button/button.component"
import axios from "axios"
import "./sign-up.form.styles.css"

const initialState = {
    name : '',
    email : '',
    password : '',
    confirmPassword : ''
}

const SignUpForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [errorMessage, setErrorMessage] = useState(null)

    const onChangeHandler = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/sign-up', {...formData})
            console.log(response)
            
        } catch (error) {
            console.log(error.response)
            setErrorMessage(error.response.data.msg)
        }
    }
    

    return(
        <div>
            <form className="wrapper-signup" action="" onSubmit={onSubmitHandler}>
                <div className="it1">I do not have an account</div>
                <div className="it2">Sign-Up with your email and password</div>
                <label className="it3" htmlFor="">Name</label>
                <input className="it4" type="text" 
                name="name" id="name" 
                value={formData.name}
                onChange={onChangeHandler}
                 required 
                />

                <label className="it5" htmlFor="">Email</label>
                <input className="it6" type="email" name="email" id="email" value={formData.email}
                
                onChange={onChangeHandler}
                required />

                <label className="it7" htmlFor="">Password</label>
                <input className="it8" type="password" name="password" id="password" 
                value={formData.password}
                onChange={onChangeHandler}
                required />

                <label className="it9" htmlFor="">Confirm Password</label>
                <input className="it10" type="password" name="confirmPassword" 
                id="confirm-password" value={formData.confirmPassword}
                onChange={onChangeHandler}
                
                required />

                <Button onclick={onSubmitHandler} className="it11" content="Sign-Up" />
            </form>
        </div>
    )
}

export default SignUpForm