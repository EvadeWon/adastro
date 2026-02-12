import { razorpay } from "@/utils/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, courseId } = body;
        const order = await razorpay.orders.create({
            amount: amount * 100, // convert to paise
            currency: "INR",
            receipt: `receipt_${courseId}`,
        });

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error("Create Order Error:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
