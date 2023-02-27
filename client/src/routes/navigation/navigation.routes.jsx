import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import logo from "../../assets/LOGO.png"
import Button from "../../components/button/button.component"
import "./navigation.styles.css"

const Navigation = () => {
    return(
        <Fragment>
            <div className="navigation-wrapper">
                <Link>
                    <img src={logo} alt="" height={95} width={250} />
                </Link>
                <div className="navigation-links">
                    <Link to="/">Home</Link>
                    <Link>About</Link>
                    <Link to="/log-in">
                        <Button content={"Log-In"}/>
                    </Link>
                </div>
                
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation