import Post from "../post/post.component"
import UserPosts from "../user-posts/userPosts.component"

const UserInfo = ({user}) => {
    return(
        <div>
        <div>
            <h3>Name : {user.name}</h3>
            <h4>About : {user.about ? user.about : "Update Info"}</h4>
            <p>Interests : {user.interests.length === 0 ?  "Add Interests" : user.interests}</p>
        </div>
        <Post creator={user.userId} />
        <UserPosts userId={user.userId}/>
    </div>
    )
}

export default UserInfo