import Post from "../post/post.component"
import { FiEdit } from 'react-icons/fi';
import { Link } from "react-router-dom";
import dp from "../../../assets/dp.jpg"
import "./user-info.styles.css"

const UserInfo = ({user}) => {
    return(
    <div className="user-info-wrapper">
        <div className="user-info-avatar">
            <img src={ user.profilePicture.length > 1 ? user.profilePicture : dp } alt="" height={150} width={150} />
            <div className="user-details">
                <h3>{user.name}</h3>
                <h4>About : {user.about ? user.about : "Update About"}  </h4>
                <p>Interests : {user.interests.length === 0 ?  "Add Interests" : user.interests}</p>
                <h5>Update Info <Link to="/user/update-user"><FiEdit /></Link></h5>
            </div>
        </div>
        <Post creator={user.userId} username={user.name} />
    </div>
    )
}

export default UserInfo