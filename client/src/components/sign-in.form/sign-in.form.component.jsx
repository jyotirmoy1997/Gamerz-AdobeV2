import "./sign-in.form.styles.css"
import Button from "../button/button.component"
import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { signInUser, userStatus } from "../../features/user/userSlice"
import { validateEmail, validatePassword } from "../../utils/validators"
import { useSelector } from "react-redux"
import { userError} from "../../features/user/userSlice"
import axios from "axios"


const initialState = {
    email : '',
    password : ''
}

const SignInForm = () => {
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formData, setFormData] = useState(initialState)
    const userLogStatus = useSelector(userStatus)
    const userErr = useSelector(userError)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    useEffect(() => {
        if(userLogStatus === 'loggedIn'){
            navigate('/user/timeline')
        }
    }, [userLogStatus, navigate])

    useEffect(() => {
        if(userErr === 'Wrong Password'){
            setPasswordError('*Incorrect Password')
            setEmailError('')
        }
        if(userErr === "User doesn't exist"){
            setEmailError("*User does not exist")
            setPasswordError('')
        }
    }, [userErr])


    
    // const userStatus = dispatch(userStatus)

    const onChangeHandler = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
    }
    

    // console.log(formData)
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        // if(validateEmail(formData.email) && validatePassword(formData.password)){

            dispatch(signInUser(formData))
            // if(userLogStatus === 'loggedOut'){
            //     console.log("Hit")
            //     console.log(userErr)
            //     setEmailError('*Email or password is wrong')
            // }
            // else{
            //     console.log('Error')
            // }
           
            // if(userInfo.err === "Wrong Password" && userInfo.status === 'loggedOut')
                // navigate('/user/timeline')
                
            
        // }
        // else if(validateEmail(formData.email) && !validatePassword(formData.password)){
        //     setPasswordError('*Enter a valid password')
        // }
        // else if(!validateEmail(formData.email) && validatePassword(formData.password)){
        //     setEmailError('*Enter a valid email')
        // }
        // else{
        //     setEmailError('*Enter a valid email')
        //     setPasswordError('*Enter a valid password')
        // }
        
    }
    return(
        <div >
            <form className="wrapper-sign-in" action="">

                <div className="el1">I already have an account</div>

                <div className="el2">Sign-In with your email and password</div>

                <div id="sign-in-email"
                    data = {emailError}
                 className="el3">Email</div>

                <input className="el4" 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={onChangeHandler} required />

                <div id="sign-in-password"
                data ={passwordError}
                 className="el5">Password</div>

                <input className="el6" 
                type="password" 
                name="password"
                value={formData.password} 
                onChange={onChangeHandler} required />

                

                <Button onClick={onSubmitHandler} className="el7" content={"Sign-In"} />
                
                {/* <button onClick={onSubmitHandler} className="el7">Sign-In</button> */}
                {/* <GoogleButton className="el8" /> */}
            </form>
            
        </div>
    )
}

export default SignInForm