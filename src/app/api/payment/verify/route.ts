import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import { getServerSession } from "next-auth";
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

        // 1. Verify signature
        const secret = process.env.RAZORPAY_KEY_SECRET as string;

        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, message: "Invalid signature" },
                { status: 400 }
            );
        }

        // 2. Get logged in user
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = (session.user as any).id;

        // 3. Save purchase
        await Purchase.create({
            userId,
            courseId,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            status: "PAID",
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Verify Error:", error);
        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}
