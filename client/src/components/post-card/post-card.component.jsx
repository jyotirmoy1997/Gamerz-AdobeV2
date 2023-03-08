import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import ReactionComponent from "../reactions/reaction.component"
import { dateConverter } from "../../utils/dateConverter";
import { FiEdit } from 'react-icons/fi';
import "./post-card.styles.css"





const PostCard = ({post, reactionList, username}) => {
    return(
        <div className="single-post">
            <h2>{post.title} </h2>
            <img src={post.image} alt="" srcSet="" height={200} width={300} />
            <h4>{username}</h4>
            <h5>{post.message}</h5>
            <ReactionComponent 
                post={post._id} 
                user={post.creator}
                reactionList={reactionList}
            />
            <p> 
                <span className="date-show">{dateConverter(post.createdAt)}</span> 
                <div className="edit-post">
                    <FiEdit  size={30}/>  
                </div>
                
            </p>
        </div>
    )
}

export default PostCard