import { useNavigate } from "react-router"
import { useEffect } from "react"

const ExistingLogin = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/user/timeline')
    }, [])
    
    return(
        <div>
            <h1>You are Already Logged-In</h1>
        </div>
    )
}

export default ExistingLogin