import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const CLIENT_URL = process.env.NODE_ENV === 'production'
        ? `https://${process.env.VERCEL_URL}`
        : process.env.CLIENT_URL;
    // Redirect to Google OAuth
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${CLIENT_URL}/api/auth/google/callback&response_type=code&scope=profile email`;


    return NextResponse.redirect(authUrl);
}