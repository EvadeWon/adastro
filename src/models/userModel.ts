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
        required: function () {
            return !this.googleId; // agar googleId nahi hai to password required
        },
    },
    referralCode: {
        type: String,
        unique: true,
    },

    referredBy: {
        type: String, // referral code of inviter
        default: null,
    },

    walletBalance: {
        type: Number,
        default: 0,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows null values
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;