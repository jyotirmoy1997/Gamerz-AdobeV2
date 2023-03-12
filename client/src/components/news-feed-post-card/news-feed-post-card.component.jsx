import { Link } from "react-router-dom"
import ReactionComponent from "../reactions/reaction.component"
import {dateConverter} from "../../utils/dateConverter"


const NFPostCard = ({post, user, reactionList}) => {
    console.log(user)
    return(
        <div className="single-post">
            <h2>{post.title} </h2>
            <img src={post.image} alt="" srcSet="" height={200} width={300} />
            <h4>{post.creatorName}</h4>
            <h5>{post.message}</h5>
            <ReactionComponent 
                post={post._id} 
                user={user.userId}
                reactionList={reactionList}
            />
            <p className="date-show"> {dateConverter(post.createdAt)}</p>
            <p><Link to={`/posts/fullpost/${post._id}`}>Show Full Post</Link></p>
        </div>
    )
}

export default NFPostCard