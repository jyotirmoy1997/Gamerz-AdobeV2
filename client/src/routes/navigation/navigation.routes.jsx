import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import logo from "../../assets/LOGO.png"
import Button from "../../components/button/button.component"
import "./navigation.styles.css"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/user/userSlice"

const Navigation = () => {
    const user = useSelector(selectUser)
    const userAvailable = Object.keys(user).length !== 0
    
    const userInfo = <Fragment>
        <Link to="/user/timeline">Timeline</Link>
        <Button content={"Log-Out"} />
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