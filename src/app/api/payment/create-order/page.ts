import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: Request) {
    const { courseId } = await req.json();

    // price fetch (static or db)
    const amount = 999 * 100; // example

    const order = await razorpay.orders.create({
        amount,
        currency: "INR",
    });

    return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
    });
}
