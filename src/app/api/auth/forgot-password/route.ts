import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendMail } from "@/utils/mail";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "If the email exists, a reset link has been sent" },
                { status: 200 }
            );
        }

        // generate token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // hash token before saving
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 min
        await user.save();

        const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

        await sendMail({
            to: user.email,
            subject: "Reset Your Password",
            html: `
                <h2>Password Reset</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link will expire in 10 minutes.</p>
            `,
        });

        return NextResponse.json(
            { message: "Reset link sent to email" },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
