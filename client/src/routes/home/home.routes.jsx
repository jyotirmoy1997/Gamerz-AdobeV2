import { useNavigate } from "react-router"

import "./home.styles.css"


const Home = () => {
    const navigate = useNavigate();
    const redirectHandler = () => {
        navigate('/log-in')
    }
    return(
        <div className="home-wrapper">
            <button onClick={redirectHandler}>Welcome</button>
            {/* <img src={bg} alt="" />
            <div className="home-intro">
                <h1>Build Your Community</h1>
            </div> */}
        </div>
    )
}

export default Home