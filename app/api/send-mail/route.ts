import siteContent, { contactInfo, siteInfo } from "@/data/site-content";
import { NextRequest, NextResponse } from "next/server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { subject, html } = await request.json();
  
  console.log("POST", subject);

  if (!subject || !html) {
    return NextResponse.json(
      { error: "E-posta içeriği eksik." },
      { status: 500 },
    );
  }

  const mailOptions = {
    from: 'sandbox@resend.dev', // contactInfo.senderEmail,
    to: contactInfo.contactEmail,
    subject: subject,
    text: html,
  };

  try {
    const { data, error } = await resend.emails.send({
      from: mailOptions.from,
      to: [mailOptions.to],
      subject: mailOptions.subject,
      html: mailOptions.text
    });

    if (error) {
      console.log(error);
      return NextResponse.json(
        { error },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "E-posta gönderilemedi" },
      { status: 500 },
    );
  }
}
