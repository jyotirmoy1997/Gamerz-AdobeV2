import { isTokenValid } from "../utils/JWT.js"

export const authenticateUser = (req, res, next) => {
    const token = req.signedCookies.token
    console.log(token)
    console.log(token)
    if(!token){
        return res.send("Unauthorized")
    }
    try {
        const {userId, name} = isTokenValid(token)
        req.user = {
            userId,
            name
        }
        console.log("You are authorized")
        next()
    } catch (error) {
        console.log(error)
    }
    
}