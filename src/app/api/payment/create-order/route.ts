import { authOptions } from "../../my-courses/route";
import { connectDB } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchase";
import User from "@/models/userModel";
import { razorpay } from "@/utils/razorpay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface CreateOrderBody {
    amount: number;
    courseId: number; // YEH ADD KARO
}

export async function POST(req: NextRequest) {
    try {
        // 1. Authentication check
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized - Please login first" },
                { status: 401 }
            );
        }

        const body: CreateOrderBody = await req.json();
        const { amount, courseId } = body;

        // 2. Validation
        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        if (!courseId) {
            return NextResponse.json(
                { error: "Course ID is required" },
                { status: 400 }
            );
        }

        await connectDB();

        // 3. Find user
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // 4. Check if already purchased
        const existingPurchase = await Purchase.findOne({
            userId: user._id,
            courseId: Number(courseId),
            status: "PAID"
        });

        if (existingPurchase) {
            return NextResponse.json(
                { error: "You have already purchased this course" },
                { status: 400 }
            );
        }

        // 5. Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            payment_capture: true,
        });

        console.log("✅ Razorpay Order Created:", order.id);

        // 6. Create PENDING purchase record
        const purchase = await Purchase.create({
            userId: user._id,
            courseId: Number(courseId),
            paymentId: "",
            orderId: order.id,
            status: "PENDING",
        });

        console.log("✅ PENDING Purchase Created:", purchase._id);

        return NextResponse.json(order, { status: 200 });

    } catch (err) {
        console.error("Razorpay order creation error:", err);
        return NextResponse.json(
            { error: "Order creation failed" },
            { status: 500 }
        );
    }
}