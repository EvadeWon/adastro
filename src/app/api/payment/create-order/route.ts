import courses from "@/lib/courses";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { courseId } = body;

        const numericCourseId = Number(courseId);

        const course = courses.find(
            (c) => c.id === numericCourseId
        );

        if (!course) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });
        const order = await razorpay.orders.create({
            amount: course.price * 100, // convert to paise
            currency: "INR",
            receipt: `receipt_${course.id}_${Date.now()}`,
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
