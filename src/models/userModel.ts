import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a name"],
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
    
})

const User=mongoose.models.User || mongoose.model("User",userSchema)
export default User;