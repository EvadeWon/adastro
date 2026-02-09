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

        // 🔥 Exchange code for access token
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        const tokens = await tokenResponse.json();
        if (!tokens.access_token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // 🔥 Get Google user info
        const userInfoRes = await fetch(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        );
        const googleUser = await userInfoRes.json();

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

        // 🔥 Create JWT
        const jwtToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        const cookieStore = await cookies();
        cookieStore.set("token", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax", // important
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.redirect(new URL("/my-courses", req.url));

    } catch (err) {
        console.error("Google Auth Error:", err);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}