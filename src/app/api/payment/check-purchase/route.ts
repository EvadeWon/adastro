import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import User from "@/models/userModel"; // 👈 import user model
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { purchased: false },
                { status: 401 }
            );
        }

        await connectDB();

        // 1️⃣ find user by email
        const user = await User.findOne({
            email: session.user.email,
        });

        if (!user) {
            return NextResponse.json(
                { purchased: false },
                { status: 404 }
            );
        }

        const body = await req.json();
        const { courseId } = body;

        // 2️⃣ check purchase using userId
        const purchase = await Purchase.findOne({
            userId: user._id,
            courseId: Number(courseId),
            status: "PAID",
        });

        return NextResponse.json({
            purchased: !!purchase,
        });

    } catch (error) {
        console.error("Check purchase error:", error);
        return NextResponse.json(
            { purchased: false },
            { status: 500 }
        );
    }
}
