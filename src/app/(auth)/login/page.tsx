// app/login/page.tsx
"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session) {
            router.push("/my-courses");
        }
    }, [session, router]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (res?.error) {
            setError(res.error);
            setLoading(false);
            return;
        }

        router.push("/my-courses");
    };

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription >
                    Login with your Google Email Account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <Button onClick={() =>
                        signIn("google", { callbackUrl: "/my-courses" })
                    }
                        className="w-full mb-2 border-[#4E4948] border bg-gradient-to-b from-[#171212] to-[#100B0B] text-grey-400 cursor-pointer">
                        <FaGoogle />
                        <span>Continue with Google</span>
                    </Button>
                    <div className="flex items-center w-full mb-2">
                        <div className="flex-1 h-px bg-border" />
                        <span className="px-3 text-sm text-white">
                            Or Continue With
                        </span>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 text-white">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="placeholder:text-white/70"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="placeholder:text-white/70"
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-[#d75525c9] hover:bg-[#bb481ec9] text-white/90 cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                        <p className="font-semibold">Do not Have an Account ? <Link className="text-[#d75525c9]" href={"/signup"}>Signup</Link></p>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}