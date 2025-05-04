
import { ApplicationFormData } from "@/components/email-template";

export async function sendApplicationEmail(formData: ApplicationFormData) {
  const subject = `${formData.name} (${formData.email})`;

  try {
    const result = await fetch("/api/send-mail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, data: formData }),
      },
    );

    if (!result.ok)
      throw new Error("Failed to send email " + (await result.text()));

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
