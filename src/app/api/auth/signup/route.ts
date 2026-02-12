import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendVerificationEmail } from "@/utils/mail";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    function generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    try {
        await connectDB();

        const { name, email, password } = await req.json();

        // 1. Basic validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // 2. Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const code = generateCode();
        // 4. Create user
        await User.create({
            name,
            email,
            password: hashedPassword,
            provider: "credentials",
            isVerified: false,
            verificationCode: code,
            verificationCodeExpiry: new Date(Date.now() + 10 * 60 * 1000),
        });
        await sendVerificationEmail(email, code);
        return NextResponse.json(
            { message: "Verification email sent" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
