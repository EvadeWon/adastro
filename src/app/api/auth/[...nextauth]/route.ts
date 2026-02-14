import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

await connectDB();
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const user = await User.findOne({
                    email: credentials?.email,
                });

                if (!user) throw new Error("User not found");

                if ((user as any).provider === "google") {
                    throw new Error("Please login with Google");
                }

                const isMatch = await bcrypt.compare(credentials!.password, user.password!);

                if (!isMatch) throw new Error("Invalid password");

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },

        async signIn({ user, account }) {
            try {
                if (account?.provider === "google") {
                    let existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        existingUser = await User.create({
                            name: user.name,
                            email: user.email,
                            googleId: account.providerAccountId,
                            provider: "google",
                            isVerified: true,
                        });
                    }

                    user.id = existingUser._id.toString();
                }
                return true;
            } catch (error) {
                console.error("Sign in error:", error);
                return false;
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
