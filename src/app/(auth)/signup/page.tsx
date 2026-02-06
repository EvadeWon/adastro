"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
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
    const handleGoogleLogin = () => {
        window.location.href = "/api/auth/google";
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            }

            // ✅ Redirect to dashboard (user is now logged in)
            router.push("/my-courses");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="">
            <CardHeader>
                <CardDescription >
                    Login with your Google Email Account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <Button onClick={handleGoogleLogin} className="w-full mb-2 border-[#4E4948] border bg-gradient-to-b from-[#171212] to-[#100B0B] text-grey-400 cursor-pointer">
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
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="placeholder:text-white/70"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="placeholder:text-white/70"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="placeholder:text-white/70"
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        <Button type="submit" className="w-full bg-[#d75525c9] hover:bg-[#bb481ec9] text-white/90 cursor-pointer" disabled={loading}>
                            {loading ? "Creating Account..." : "Signup"}
                        </Button>
                        <p className="font-semibold">Have an Account ? <Link className="text-[#d75525c9]" href={"/login"}>Login</Link></p>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}