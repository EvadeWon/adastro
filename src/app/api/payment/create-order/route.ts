import courses from "@/lib/courses";
import { razorpay } from "@/utils/razorpay";
import { NextResponse } from "next/server";

type CreateOrderBody = {
    amount: number;
    courseId: number;
};
export async function POST(req: Request) {
    try {
        const body:CreateOrderBody = await req.json();
        const { courseId,amount } = body;

        const course = courses.find(c => c.id === courseId);

        if (!course || courseId) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }
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
