import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { userId: string };

        await connectDB();
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return NextResponse.json({ user: null }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (err) {
        console.error("Auth error:", err);
        return NextResponse.json({ user: null }, { status: 401 });
    }
}