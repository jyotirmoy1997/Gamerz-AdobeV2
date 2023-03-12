import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { signInUser, userStatus } from "../../features/user/userSlice"
import { validateEmail, validatePassword } from "../../utils/validators"
import { userError} from "../../features/user/userSlice"
import Button from "../button/button.component"
import "./sign-in.form.styles.css"


const initialState = {
    email : '',
    password : ''
}

const SignInForm = () => {
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formData, setFormData] = useState(initialState)
    const userLogStatus = useSelector(userStatus) === 'loggedIn'
    const userErr = useSelector(userError)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    useEffect(() => {
        if(userLogStatus){
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
        if(formData.email === ''){
            setEmailError('Email Cannot be Empty')
        }
        if(formData.password === ''){
            setPasswordError('Password cannot be Empty')
        }
        if(validateEmail(formData.email) && validatePassword(formData.password)){
            dispatch(signInUser(formData))
        }
        else if(validateEmail(formData.email) && !validatePassword(formData.password)){
            setPasswordError('*Enter a valid password')
        }
        else if(!validateEmail(formData.email) && validatePassword(formData.password)){
            setEmailError('*Enter a valid email')
        }
        else{
            setEmailError('*Enter a valid email')
            setPasswordError('*Enter a valid password')
        }
        
    }

    return(
        <div >
            <form className="wrapper-sign-in" action="" onSubmit={onSubmitHandler}>

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

            </form>
            
        </div>
    )
}

export default SignInForm