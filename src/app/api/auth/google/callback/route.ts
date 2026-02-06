import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const code = searchParams.get("code");
        console.log("CODE:", code);
        console.log("CLIENT_URL:", process.env.CLIENT_URL);


        if (!code) {
            return NextResponse.redirect(new URL("/login?error=no_code", req.url));
        }

        // Exchange code for tokens
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: `${process.env.CLIENT_URL}/api/auth/google/callback`,
                grant_type: "authorization_code",
            }),
        });

        const tokens = await tokenResponse.json();
        console.log("TOKENS:", tokens);

        if (!tokens.access_token) {
            return NextResponse.redirect(new URL("/login?error=no_token", req.url));
        }

        // Get user info from Google
        const userInfoResponse = await fetch(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: { Authorization: `Bearer ${tokens.access_token}` },
            }
        );

        const googleUser = await userInfoResponse.json();

        // Connect to database
        await connectDB();

        // Find or create user
        let user = await User.findOne({ email: googleUser.email });

        if (!user) {
            user = await User.create({
                name: googleUser.name,
                email: googleUser.email,
                googleId: googleUser.id,
                password: "",
                isVerified: true,
            });
        } else if (!user.googleId) {
            user.googleId = googleUser.id;
            user.isVerified = true;
            await user.save();
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        // Redirect to dashboard
        return NextResponse.redirect(new URL("/my-courses", req.url));
    } catch (error) {
        console.error("Google auth error:", error);
        return NextResponse.redirect(new URL("/login?error=auth_failed", req.url));
    }
}