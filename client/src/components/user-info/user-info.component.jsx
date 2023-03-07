import Post from "../post/post.component"
import dp from "../../../assets/dp.jpg"
import "./user-info.styles.css"

const UserInfo = ({user}) => {
    return(
    <div className="user-info-wrapper">
        <div className="user-info-avatar">
            <img src={dp} alt="" height={150} width={150} />
            <div className="user-details">
                <h3>{user.name}</h3>
                <h4>{user.about ? user.about : "Update Info"}</h4>
                <p>Interests : {user.interests.length === 0 ?  "Add Interests" : user.interests}</p>
            </div>
        </div>
        <Post creator={user.userId} />
    </div>
    )
}

export default UserInfo