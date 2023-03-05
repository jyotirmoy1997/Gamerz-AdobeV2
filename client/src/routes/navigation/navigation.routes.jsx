import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import logo from "../../assets/LOGO.png"
import Button from "../../components/button/button.component"
import "./navigation.styles.css"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, userStatus } from "../../features/user/userSlice"
import { logOutUser } from "../../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { removePosts } from "../../features/posts/postSlice"
import { removeReactions } from "../../features/reactions/reactionSlice"

const Navigation = () => {
    const userLogStatus = useSelector(userStatus)
    const userAvailable = userLogStatus === "loggedOut" ? false : true

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logOutHandler = () => {
        dispatch(logOutUser())
        dispatch(removePosts())
        dispatch(removeReactions())
        navigate('/')
    }
    
    const userInfo = <Fragment>
        <Link to="/user/timeline">Timeline</Link>
        <Link to="/user/newsfeed">News Feed</Link>
        <Button onClick={logOutHandler} content={"Log-Out"} />
    </Fragment> 

    return(
        <Fragment>
            <div className="navigation-wrapper">
                <Link>
                    <img src={logo} alt="" height={95} width={250} />
                </Link>
                <div className="navigation-links">
                    <Link to="/">Home</Link>
                    {
                        userAvailable ? userInfo : <Link to="/log-in">
                            <Button content={"Log-In"} />
                        </Link>
                    }
                    
                </div>
                
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation