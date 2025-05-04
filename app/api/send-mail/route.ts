import ApplicationEmail, { ApplicationFormData } from "@/components/email-template";
import siteContent, { contactInfo, siteInfo } from "@/data/site-content";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { subject, data: formData } = await request.json();
  
  console.log("POST", subject);

  if (!subject || !formData) {
    return NextResponse.json(
      { error: "E-posta içeriği eksik." },
      { status: 500 },
    );
  }


  try {
    const { data, error } = await resend.emails.send({
      from: 'sandbox@resend.dev', // contactInfo.senderEmail,
      to: contactInfo.contactEmail,
      subject: subject,
      react: ApplicationEmail(formData as ApplicationFormData),
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
