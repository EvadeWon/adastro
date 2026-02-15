import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: "Invalid request" },
                { status: 400 }
            );
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            { message: "Password reset successful" },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
