import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../features/user/userSlice"
import UserInfo from "../user-info/user-info.component"
import ReactionComponent from "../reactions/reaction.component"

const TimeLine = () => {
    const userInfo = useSelector(selectUser)
    console.log(userInfo)

    let content;

    if(userInfo.status === "pending"){
        content = <h2>Loading...</h2>
    }
    else if(userInfo.status === "loggedIn"){
        content = <UserInfo user={userInfo.user} />
    }
    
    // console.log(user)
    return(
        <div>
            <h1>TimeLine</h1>
            <ReactionComponent 
            post={"63ff247155865db613c83163"} 
            user={"63ff277355865db613c83174"} />
            {/* {content} */}
        </div>
    )
}

export default TimeLine