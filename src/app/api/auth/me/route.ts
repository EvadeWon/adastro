import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "User data not implemented yet",
        user: null,
    });
}
