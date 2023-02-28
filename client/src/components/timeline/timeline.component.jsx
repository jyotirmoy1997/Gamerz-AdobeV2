import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../features/user/userSlice"
import Form from "../form/form.component"

const TimeLine = () => {
    const user = useSelector(selectUser)
    // console.log(user)
    return(
        <div>
            <div>
                <h3>Name : {user.name}</h3>
                <h4>About : {user.about ? user.about : "Update Info"}</h4>
                <p>Interests : {user.interests.length === 0 ?  "Add Interests" : user.interests}</p>
            </div>
            <Form creator={user._id} />
        </div>
    )
}

export default TimeLine