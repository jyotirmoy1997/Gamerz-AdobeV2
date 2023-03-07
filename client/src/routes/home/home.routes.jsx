import { useNavigate } from "react-router"
import bg from "../../../assets/wallpaper.jpg"
import bg2 from "../../../assets/7459.jpg"
import { Link } from "react-router-dom"
import "./home.styles.css"
import { FiExternalLink } from 'react-icons/fi';
// import { ExternalLinkIcon } from '@chakra-ui/icons'


const Home = () => {
    const navigate = useNavigate();
    const redirectHandler = () => {
        navigate('/log-in')
    }
    return(
        <div className="home-wrapper">
            <h1>Welcome to Gamerz Adobe, A Place Where Gamers Assemble</h1>
            <img src={bg} alt="" />
            <div className="home-cover">
                <img src={bg2} alt="" srcSet="" />
                <Link to="/log-in"><button>Join <FiExternalLink/> </button></Link>
                
            </div>
            {/* <button onClick={redirectHandler}>Welcome</button> */}
            {/* <img src={bg} alt="" />
            <div className="home-intro">
                <h1>Build Your Community</h1>
            </div> */}
        </div>
    )
}

export default Home