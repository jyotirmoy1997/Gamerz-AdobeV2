import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 32
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

const UserModel = mongoose.model("User", UserSchema)

export default UserModel