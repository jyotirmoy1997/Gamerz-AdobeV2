import Post from "../../components/post/post.component"
import Posts from "../../components/posts/posts.component"
import Form from "../../components/form/form.component"


const Home = () => {
    return(
        <div>
            {/* <Post/> */}
            <Posts />
            <Form/>
        </div>
    )
}

export default Home