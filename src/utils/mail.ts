import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});


//send enquiry mail to owner
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
        from: `"AdAstro" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
        replyTo,
    });
}


//send email verification male to user
export async function sendVerificationEmail(
    email: string,
    code: string
) {
    await transporter.sendMail({
        from: `"AdAstro" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Verify Your Email",
        html: `
            <h2>Email Verification</h2>
            <p>Your verification code is:</p>
            <h1>${code}</h1>
            <p>This code will expire in 10 minutes.</p>
        `,
    });
}
