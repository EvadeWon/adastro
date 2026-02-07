import { NextResponse } from "next/server";

export async function GET() {
    const CLIENT_URL =
        process.env.NODE_ENV === "production"
            ? process.env.CLIENT_URL
            : "http://localhost:3000";

    const redirectUri = `${CLIENT_URL}/api/auth/google/callback`;

    const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth` +
        `?client_id=${process.env.GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=code` +
        `&scope=profile%20email`;

    return NextResponse.redirect(authUrl);
}
