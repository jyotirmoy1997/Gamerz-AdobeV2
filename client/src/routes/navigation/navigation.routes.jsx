import { Link, Outlet } from "react-router-dom"
import { Fragment, useEffect, useState } from "react"
import logo from "../../assets/LOGO.png"
import Button from "../../components/button/button.component"
import "./navigation.styles.css"
import { useSelector, useDispatch } from "react-redux"
import { userStatus } from "../../features/user/userSlice"
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
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }
    
    const userInfo = <Fragment>
        <Link to="/user/timeline">Timeline</Link>
        <Link to="/user/newsfeed">News Feed</Link>
        <Button onClick={logOutHandler} content={"Log-Out"} />
    </Fragment> 

    return(
        <Fragment>
            <div className="navigation-wrapper">
                <Link to="/">
                    <img src={logo} alt="" height={95} width={250} />
                </Link>
                <div className="navigation-links" >
                    {
                        userAvailable ? userInfo :
                        <Fragment >
                            <Link to="/">Home</Link>
                            <Link to="/log-in">
                                <Button content={"Log-In"} />
                            </Link>
                        </Fragment>
                    }
                    
                </div>
                
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation