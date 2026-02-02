import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

type SendMailProps = {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
};

export async function sendMail({
    to,
    subject,
    html,
    replyTo,
}: SendMailProps) {
    await transporter.sendMail({
        from: `"Evade Won" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
        replyTo,
    });
}
