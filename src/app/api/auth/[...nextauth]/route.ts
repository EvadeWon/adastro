import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
        // Google login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

        // Credentials login
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({
                    email: credentials?.email,
                });

                if (!user) {
                    throw new Error("User not found");
                }

                // Google user ko block karo
                if (user.provider === "google") {
                    throw new Error("Please login with Google");
                }

                const isMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );

                if (!isMatch) {
                    throw new Error("Invalid password");
                }

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
        async signIn({ user, account, profile }) {
            try {
                if (account?.provider === "google") {
                    await connectDB();

                    const existingUser = await User.findOne({
                        email: user.email,
                    });

                    if (!existingUser) {
                        // Create new user
                        const newUser = await User.create({
                            name: user.name,
                            email: user.email,
                            googleId: account.providerAccountId,
                            provider: "google",
                            isVerified: true,
                        });
                        
                        // IMPORTANT: Set the user.id for the JWT callback
                        user.id = newUser._id.toString();
                    } else {
                        // IMPORTANT: Set the user.id for existing users too
                        user.id = existingUser._id.toString();
                    }
                }
                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false; // This will prevent login if there's an error
            }
        },

        async jwt({ token, user, account }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            
            // For Google provider, fetch user from DB to ensure we have the ID
            if (account?.provider === "google" && token.email) {
                await connectDB();
                const dbUser = await User.findOne({ email: token.email });
                if (dbUser) {
                    token.id = dbUser._id.toString();
                }
            }
            
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",
        error: "/login", // Redirect errors to login page
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };