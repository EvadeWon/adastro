import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, code } = await req.json();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (
            !user.verificationCode ||
            !user.verificationCodeExpiry
        ) {
            return NextResponse.json(
                { message: "No verification code found" },
                { status: 400 }
            );
        }
        if (user.verificationCodeExpiry < new Date()) {
            return NextResponse.json(
                { message: "Code has expired" },
                { status: 400 }
            );
        }
        const cleanUserCode = String(code).replace(/\s/g, '').trim();
        const cleanDbCode = String(user.verificationCode).replace(/\s/g, '').trim();
        if (cleanDbCode !== cleanUserCode) {
            return NextResponse.json(
                { message: "Invalid or expired code" },
                { status: 400 }
            );
        }
        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpiry = null;

        await user.save();

        return NextResponse.json(
            { message: "Email verified successfully" },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
