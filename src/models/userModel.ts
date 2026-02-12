import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a name"],
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () { return this.provider === "credentials" },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    provider: {
        type: String,
        enum: ["credentials", "google"],
        default: "credentials",
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verificationCode: String,
    verificationCodeExpiry: Date,

})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;