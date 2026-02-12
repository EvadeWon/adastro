import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendVerificationEmail } from "@/utils/mail";
import { NextResponse } from "next/server";

// 6 digit code generator
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // if already verified
        if (user.isVerified) {
            return NextResponse.json(
                { message: "User already verified" },
                { status: 400 }
            );
        }

        // generate new code
        const code = generateCode();

        // save new code
        user.verificationCode = code;
        user.verificationCodeExpiry = new Date(
            Date.now() + 10 * 60 * 1000 // 10 min
        );

        await user.save();

        // send email
        await sendVerificationEmail(email, code);

        return NextResponse.json(
            { message: "Verification code resent" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Resend code error:", error);

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
