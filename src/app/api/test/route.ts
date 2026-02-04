import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    return NextResponse.json({ message: "DB check done" });
}
