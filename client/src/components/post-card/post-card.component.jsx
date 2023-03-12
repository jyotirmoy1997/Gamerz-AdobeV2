import { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import ReactionComponent from "../reactions/reaction.component"
import { dateConverter } from "../../utils/dateConverter";
import { FiEdit } from 'react-icons/fi';
import "./post-card.styles.css"





const PostCard = ({post, reactionList, username}) => {
    console.log(post)
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate()
    const editPostHandler = () => {
        setShouldNavigate(true);
    }

    useEffect(() => {
        if (shouldNavigate) {
            setShouldNavigate(false);
            navigate(`/posts/${post._id}`);
        }
      }, [shouldNavigate, navigate, post._id]);

    console.log("Rendered")
    
    return(
        <div className="single-post">
            <h2>{post.title} </h2>
            <img src={post.image} alt="" srcSet="" height={200} width={300} />
            <h4>{username}</h4>
            <h5>{post.message.length > 100 ? post.message.substring(0, 99) : post.message}</h5>
            <ReactionComponent 
                post={post._id} 
                user={post.creatorId}
                reactionList={reactionList}
            />
            <p> 
                <span className="date-show">{dateConverter(post.createdAt)}</span> 
                <span className="edit-post" onClick={() => editPostHandler()}>
                    <FiEdit  size={30}/>  
                </span>
                
            </p>
        </div>
    )
}

export default PostCard