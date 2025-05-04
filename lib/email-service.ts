"use server";

import { ApplicationFormData } from "@/components/email-template";

export async function sendApplicationEmail(formData: ApplicationFormData) {
  const subject = `${formData.name} (${formData.email})`;

  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/send-mail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, data: formData }),
      },
    );

    if (!result.ok)
      throw new Error("Failed to send email " + (await result.json()));

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
