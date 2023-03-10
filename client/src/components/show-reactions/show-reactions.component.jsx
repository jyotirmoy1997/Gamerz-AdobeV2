import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, selectAllUser } from "../../features/user/userSlice"
import { AiFillLike, AiFillHeart } from 'react-icons/ai';
import { BsRocketTakeoffFill } from 'react-icons/bs';
import Avatar from "../avatar/avatar.component";
import defaultDp from "../../../assets/dp.jpg"
import "./show-reactions.styles.css"

const ShowReactions = ({reaction}) => {
    const [activeReaction, setActiveReaction] = useState("likes")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    const allUsers = useSelector(selectAllUser)
    // console.log(allUsers)
    // console.log(reaction[`${activeReaction}`])
    return(
        <div className="show-reactions-wrapper">
            <div className="show-reactions-icons-container">
                <div onClick={() => setActiveReaction("likes")}>
                    <AiFillLike size={30}/>{reaction.likeCount}
                </div>
                <div onClick={() => setActiveReaction("hearts")}>
                    <AiFillHeart size={30}/>{reaction.heartCount}
                </div>
                <div onClick={() => setActiveReaction("rockets")}>
                    <BsRocketTakeoffFill size={30}/>{reaction.rocketCount}
                </div>
            </div>
            <div className="show-reactions-list-container">
                {
                    reaction[`${activeReaction}`] && 
                    reaction[`${activeReaction}`].map((id) => {
                        return(
                            <Avatar allUsers={allUsers} id={id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShowReactions

// 