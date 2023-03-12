import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAllUser, getAllUsers } from "../../features/user/userSlice"
import Avatar from "../avatar/avatar.component"
import "./show-comments.styles.css"

const ShowComments = ({comments}) => {
    const allUsers = useSelector(selectAllUser)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    return(
        <div className="comments-outer">
            <h3>Comments</h3>
            <div className="comments-wrapper">
                {
                    comments.map((comment) => {
                        return(
                            <div key={comment._id}>
                                <Avatar allUsers={allUsers} id={comment.userId} />
                                <p>{comment.comment}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShowComments