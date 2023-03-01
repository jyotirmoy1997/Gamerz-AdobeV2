import axios from "axios"

const ReactionComponent = ({post, user}) => {
    console.log(post, user)
    const likeSubmitHandler = async () => {
        const response = await axios.post("http://localhost:5000/api/v1/reactions/updateLikes", {
            post,
            user
        })
        console.log(response)
    }
    const heartSubmitHandler = async () => {
        const response = await axios.post("http://localhost:5000/api/v1/reactions/updateHearts", {
            post,
            user
        })
        console.log(response)
    }
    return(
        <div>
            <button onClick={likeSubmitHandler}>Like</button>
            <button onClick={heartSubmitHandler}>Heart</button>
            <button>Rocket</button>
        </div>
    )
}

export default ReactionComponent