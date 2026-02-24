import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId,
        } = body;

        // 1️⃣ Verify Razorpay Signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, message: "Invalid signature" },
                { status: 400 }
            );
        }

        // 2️⃣ Check Logged-in User
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = (session.user as any).id;

        // 3️⃣ Prevent Duplicate Entry
        const existing = await Purchase.findOne({
            paymentId: razorpay_payment_id,
        });

        if (!existing) {
            await Purchase.create({
                userId,
                courseId: Number(courseId),
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                status: "PAID",
            });
        }

        return NextResponse.json(
            { success: true, message: "Payment verified successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Verify Error:", error);
        return NextResponse.json(
            { success: false, message: "Verification failed" },
            { status: 500 }
        );
    }
}