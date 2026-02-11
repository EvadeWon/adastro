    import { connectDB } from "@/dbConfig/dbConfig";
    import User from "@/models/userModel";
    import bcrypt from "bcryptjs";
    import NextAuth from "next-auth";
    import CredentialsProvider from "next-auth/providers/credentials";
    import GoogleProvider from "next-auth/providers/google";

    const handler = NextAuth({
        providers: [
            // Google login
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
            async signIn({ user, account }) {
                if (account?.provider === "google") {
                    await connectDB();

                    const existingUser = await User.findOne({
                        email: user.email,
                    });

                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            googleId: account.providerAccountId,
                            provider: "google",
                            isVerified: true,
                        });
                    }
                }
                return true;
            },

            async jwt({ token, user }) {
                if (user) {
                    token.email = user.email;
                    token.name = user.name;
                }
                return token;
            },

            async session({ session, token }) {
                if (session.user && token) {
                    session.user.email = token.email as string;
                    session.user.name = token.name as string;
                }
                return session;
            },
        },

        secret: process.env.NEXTAUTH_SECRET,
    });

    export { handler as GET, handler as POST };
