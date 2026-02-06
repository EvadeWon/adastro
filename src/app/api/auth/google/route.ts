import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // Redirect to Google OAuth
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${process.env.GOOGLE_CLIENT_ID}
&redirect_uri=${process.env.CLIENT_URL}/api/auth/google/callback
&response_type=code
&scope=profile email`;


    return NextResponse.redirect(authUrl);
}