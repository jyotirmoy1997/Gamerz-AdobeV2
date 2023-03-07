import { useSelector} from "react-redux"
import { selectUser, userStatus } from "../../features/user/userSlice"
import UserInfo from "../user-info/user-info.component"
import UserPosts from "../user-posts/userPosts.component"
import { Oval } from  'react-loader-spinner'
import "./timeline.styles.css"


const TimeLine = () => {
    const user = useSelector(selectUser)
    const userLogStatus = useSelector(userStatus)
    
    let content;

    if(userLogStatus === "pending" ){
        content = <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      
      />
    }
    else if(userLogStatus === "loggedIn"){
        content = 
        <div className="timeline">
            <UserInfo user={user} />
            <UserPosts 
            userId={user.userId} 
            username={user.name}
        />
        </div>
        
   }
    return(
        <div >
            {content}
        </div>
    )
}

export default TimeLine