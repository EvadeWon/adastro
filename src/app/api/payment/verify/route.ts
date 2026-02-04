import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        courseId,
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET!)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return NextResponse.json({ success: false }, { status: 400 });
    }

    await connectDB();

    await Purchase.create({
        userId: "FROM_AUTH_MIDDLEWARE",
        courseId,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "PAID",
    });

    return NextResponse.json({ success: true });
}
