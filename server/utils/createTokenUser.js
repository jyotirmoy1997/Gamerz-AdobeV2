export const createTokenUser = (user) => ({
    userId : user._id, 
    name : user.name, 
    about : user.about,
    interests : user.interests,
})