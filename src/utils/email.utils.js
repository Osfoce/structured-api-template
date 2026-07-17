import nodemailer from "nodemailer";

export const sendEmail = async (emailDetails) => {
    
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
        auth: {
            user: process.env.GMAIL_ADDRESS,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: emailDetails.from, // sender address
            to: emailDetails.to, // list of recipients
            subject: emailDetails.subject, // subject line
            text: emailDetails.url, // plain text body
            html: emailDetails.template, // HTML body
        });

    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}