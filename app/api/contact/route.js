import { NextResponse } from "next/server";
import nodemailer from "nodemailer"


export async function POST(req) {
    try {
        const {name,email,message} = await req.json()


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const containerStyle = `
            font-family: Arial, sans-serif;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 8px;
            color: #333;
        `;

        const mailToSelf = {
            to: process.env.EMAIL,
            subject: "New Message from Contact Form",
            html: `
        <div style="${containerStyle}">
          <h2 style="color: #4CAF50; margin-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; white-space: pre-wrap;">${message}</div>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailToSelf);

        return NextResponse.json({
            message:"Message Sent",
            info
        })


    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}