import defaultDp from "../../../assets/dp.jpg"
import "./avatar.styles.css"

const Avatar = ({allUsers, id}) => {
    console.log(allUsers[`${id}`].profilePicture)
    return(
    <div className="avatar-wrapper">
        <img 
            src={allUsers[`${id}`].profilePicture.length > 1 ?  
                allUsers[`${id}`].profilePicture : defaultDp} 
            alt="" srcset="" 
            height={50} 
            width={50}
        /> 
        <span>
            {allUsers[`${id}`].name}
        </span>
    </div>
    )
}

export default Avatar