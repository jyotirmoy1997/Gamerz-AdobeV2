import { useNavigate } from "react-router"
import bg from "../../../assets/wallpaper.jpg"
import bg2 from "../../../assets/7459(1).jpg"
import { Link } from "react-router-dom"
import "./home.styles.css"
import { FiExternalLink } from 'react-icons/fi';
import Footer from "../../components/footer/footer.component"
// import { ExternalLinkIcon } from '@chakra-ui/icons'


const Home = () => {
    const navigate = useNavigate();
    const redirectHandler = () => {
        navigate('/log-in')
    }
    return(
        <div className="home-wrapper">
            <h1>Welcome to Gamerz Adobe</h1>
            <img src={bg} alt="" />
            <h1>A Place Where Gamers Assemble</h1>
            <div className="home-cover">
                <img src={bg2} alt="" srcSet="" />
                <Link to="/log-in"><button>Join <FiExternalLink/> </button></Link>
                
            </div>
            <Footer />
        </div>
    )
}

export default Home