import { sendMail } from "@/utils/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, phone, serviceType, message } = await req.json();

        if (!email || !message || !phone || !serviceType || !name) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        await sendMail({
            to: "akashsingh957230@gmail.com",
            subject: "New Enquiry Received",
            replyTo: email,
            html: `
        <h3>New Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${serviceType}</p>
        <p><strong>Message:</strong> ${message}</p>
    `,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json(
            { error: "Email failed" },
            { status: 500 }
        );
    }
}
