import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get("code");

        if (!code) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        const BASE_URL =
            process.env.NODE_ENV === "production"
                ? process.env.BASE_URL!
                : "http://localhost:3000";

        const redirectUri = `${BASE_URL}/api/auth/google/callback`;

        // Exchange code for tokens
        const tokenResponse = await fetch(
            "https://oauth2.googleapis.com/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    code,
                    client_id: process.env.GOOGLE_CLIENT_ID!,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                    redirect_uri: redirectUri,
                    grant_type: "authorization_code",
                }),
            }
        );

        const tokens = await tokenResponse.json();
        if (!tokens.access_token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // Get user info
        const userInfoResponse = await fetch(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                },
            }
        );

        const googleUser = await userInfoResponse.json();

        await connectDB();

        let user = await User.findOne({ email: googleUser.email });

        if (!user) {
            user = await User.create({
                name: googleUser.name,
                email: googleUser.email,
                googleId: googleUser.id,
                password: "",
                isVerified: true,
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        // const cookieStore = await cookies();

        const response = NextResponse.redirect(new URL("/my-courses", req.url));

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
