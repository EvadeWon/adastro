import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature") as string;

        const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const event = JSON.parse(body);

        if (event.event === "payment.captured") {
            const payment = event.payload.payment.entity;

            await Purchase.create({
                userId: payment.notes.userId, // send userId in notes while creating order
                courseId: Number(payment.notes.courseId),
                paymentId: payment.id,
                orderId: payment.order_id,
                status: "PAID",
            });
        }

        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
    }
}