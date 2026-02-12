import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { purchases: [] },
                { status: 401 }
            );
        }

        const userId = (session.user as any).id;

        // Get only PAID purchases
        const purchases = await Purchase.find({
            userId,
            status: "PAID",
        }).select("courseId status");

        return NextResponse.json(
            { purchases },
            { status: 200 }
        );
    } catch (error) {
        console.error("My courses error:", error);

        return NextResponse.json(
            { purchases: [] },
            { status: 500 }
        );
    }
}
