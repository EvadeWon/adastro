"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { coursesType } from "@/lib/courses";
import { useRouter } from "next/navigation";

type CheckoutDrawerProps = {
    open: boolean;
    onClose: () => void;
    course: coursesType;
};
type RazorpayResponse = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
};
export default function CheckoutDrawer({
    open,
    onClose,
    course,
}: CheckoutDrawerProps) {
    const router = useRouter();

    const handleProceed = async () => {
    try {
        // 2. Create order from backend
        const res = await fetch("/api/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: course.price,
                courseId: course.id,
            }),
        });

        const order = await res.json();

        if (!order.id) {
            alert("Failed to create order");
            return;
        }

        // 3. Razorpay options
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            amount: order.amount,
            currency: order.currency,
            name: "AdAstro",
            description: course.title,
            order_id: order.id,

            handler: async (response: RazorpayResponse) => {
                try {
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...response,
                            courseId: course.id,
                        }),
                    });

                    const data = await verifyRes.json();
                    if (data.success) {
                        alert("Payment Successful");
                        router.push("/my-courses");
                    } else {
                        alert("Payment verification failed");
                    }
                } catch (err) {
                    console.error("Verification error:", err);
                    alert("Something went wrong");
                }
            },

            theme: { color: "#d75525" },
        };

        // 4. Open Razorpay popup
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    } catch (err) {
        console.error("Payment error:", err);
        alert("Something went wrong");
    }
};



    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent
                side="right"
                className="w-[80%] sm:w-[35%] text-white"
                style={{
                    background: "rgb(26, 26, 32)",
                    border: "1px solid rgb(42, 42, 42)",
                }}
            >
                <SheetHeader className="mt-8">
                    <SheetTitle className="text-2xl">Order Details</SheetTitle>
                </SheetHeader>

                <div className="space-y-4 px-6">
                    <h2 className="text-xl font-semibold">{course.title}</h2>
                    <p className="text-gray-400 text-sm">{course.description}</p>

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{course.price}</span>
                    </div>

                    <Button
                        onClick={handleProceed}
                        className="w-full bg-[#d75525c9] text-lg py-6 hover:bg-[#973411c9] cursor-pointer"
                    >
                        Proceed
                    </Button>

                    <p className="text-xs text-gray-400 text-center mt-2">
                        Secure payment · No refunds
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}
