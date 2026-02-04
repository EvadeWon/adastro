"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
    const params = useSearchParams();
    const courseId = params.get("courseId");
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        const res = await fetch("/api/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId }),
        });

        const data = await res.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            amount: data.amount,
            currency: "INR",
            order_id: data.orderId,
            name: "AdAstro",
            description: "Course Purchase",
            handler: async function (response: any) {
                await fetch("/api/payment/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...response,
                        courseId,
                    }),
                });

                window.location.href = "/dashboard";
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-gray-400">Course ID: {courseId}</p>

            <button
                onClick={handlePayment}
                disabled={loading}
                className="px-8 py-4 rounded-lg bg-yellow-400 text-black font-bold"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
}
