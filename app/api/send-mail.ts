import siteContent, { siteInfo } from "@/data/site-content";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const config = { runtime: 'nodejs' }

const transporter = nodemailer.createTransport({
  service: "Gmail", // veya başka bir e-posta servisi kullanabilirsin
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  const { subject, html } = await request.json();

  if (!subject || !html) {
    return NextResponse.json(
      { error: "E-posta içeriği eksik." },
      { status: 500 },
    );
  }

  const mailOptions = {
    from: siteInfo.siteName,
    to: process.env.EMAIL_ADDR,
    subject: subject,
    text: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return NextResponse.json(
      { message: "E-posta başarıyla gönderildi" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "E-posta gönderilemedi" },
      { status: 500 },
    );
  }
}
