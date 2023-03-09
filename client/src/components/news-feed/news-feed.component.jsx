import { useSelector } from "react-redux"
import { selectAllPosts } from "../../features/posts/postSlice"
import { selectUser } from "../../features/user/userSlice"
import { selectAllReactions } from "../../features/reactions/reactionSlice"
import NFPostCard from "../news-feed-post-card/news-feed-post-card.component"
import "./news-feed.styles.css"


const NewsFeed = () => {
    const user = useSelector(selectUser)
    const postList = useSelector(selectAllPosts)
    const reactionList = useSelector(selectAllReactions)

    const userNewsFeedPosts = postList.filter((post) => post.creatorId !== user.userId)
    
    console.log("Newd Feed", userNewsFeedPosts)
    return(
        <div className="news-feed-wrapper">
            {
                userNewsFeedPosts.map((post) => {
                    return(
                        < NFPostCard key={post._id} post={post} reactionList={reactionList} />
                    )
                })
            }
        </div>
    )
}

export default NewsFeed