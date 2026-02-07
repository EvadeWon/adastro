import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ courses: [] });
        }

        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        await connectDB();

        const purchases = await Purchase.find({
            userId: decoded.userId,
        });

        return NextResponse.json({ purchases });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ purchases: [] });
    }
}
