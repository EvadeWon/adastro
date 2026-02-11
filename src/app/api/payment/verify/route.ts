import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

interface VerifyPaymentBody {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    courseId: string;
    userId?: string; // optional if session is used
}

export async function POST(req: NextRequest) {
    try {
        const body: VerifyPaymentBody = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId } = body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
        }

        await connectDB();

        const purchase = new Purchase({
            userId,
            courseId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            status: "PAID",
        });

        await purchase.save();

        return NextResponse.json({ success: true, purchase }, { status: 200 });
    } catch (err) {
        console.error("Payment verification error:", err);
        return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
    }
}
