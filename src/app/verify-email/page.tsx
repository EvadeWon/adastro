"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyEmail() {
    const [resendLoading, setResendLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState("");

    const params = useSearchParams();
    const router = useRouter();
    const email = params.get("email");

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async () => {
        setLoading(true);
        setError("");

        const res = await fetch("/api/auth/verify-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
            setLoading(false);
            return;
        }

        // ✅ Redirect to login with success message
        router.push("/login");
        setLoading(false);
        toast.success("signup successful Now, Login to Explore Courses");
    };

    const handleResend = async () => {
        setResendLoading(true);
        setResendMessage("");

        const res = await fetch("/api/auth/resend-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
            setResendMessage("New code sent to your email");
        } else {
            setResendMessage(data.message);
        }

        setResendLoading(false);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <Card className="w-full max-w-md bg-[#0f0f0f] border border-[#2a2a2a]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">
                        Verify your email
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Enter the 6-digit code sent to
                        <span className="block font-semibold text-white mt-1">
                            {email}
                        </span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="code" className="text-white">
                            Verification Code
                        </Label>
                        <Input
                            id="code"
                            type="text"
                            placeholder="Enter code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="text-center text-lg tracking-widest placeholder:text-white/50"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <Button
                        onClick={handleVerify}
                        className="w-full bg-[#d75525c9] hover:bg-[#bb481ec9] text-white"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </Button>

                    <p className="text-center text-sm text-gray-400">
                        Didn’t receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendLoading}
                            className="text-[#d75525c9] hover:underline"
                        >
                            {resendLoading ? "Sending..." : "Resend"}
                        </button>

                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
