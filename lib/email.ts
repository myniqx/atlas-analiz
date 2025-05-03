"use server"

import { inDevelopment } from "./utils"

interface EmailData {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(data: EmailData, contactEmail: string) {
  if (inDevelopment) {
    // Simulating email sending in development
    console.log("Development mode: Email would be sent with data:", data)
    console.log("Contact email from site content:", contactEmail)
    return { success: true }
  }

  try {
    // In production, you would use a service like Nodemailer, SendGrid, etc.
    // Example with a hypothetical email service:
    // const response = await fetch('https://api.emailservice.com/send', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: contactEmail,
    //     from: data.email,
    //     subject: `Contact Form: ${data.name}`,
    //     text: data.message,
    //   }),
    // });

    // if (!response.ok) throw new Error('Failed to send email');

    // For now, we'll just simulate a successful response
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email")
  }
}
