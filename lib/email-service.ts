"use server";

import { inDevelopment } from "./utils";
import { contactInfo } from "@/data/site-content";

interface ApplicationFormData {
  name: string;
  phone: string;
  email: string;
  department: string;
  subject: string;
  level: string;
  pageCount: string;
  dueDate: string;
  language: string;
  method: string;
  notes: string;
}

// Function to format the study level in a more readable way
function formatStudyLevel(level: string): string {
  const levelMap: Record<string, string> = {
    lisans: "Lisans",
    "tezsiz-yuksek-lisans": "Tezsiz Yüksek Lisans",
    "tezli-yuksek-lisans": "Tezli Yüksek Lisans",
    doktora: "Doktora",
    diger: "Diğer",
  };

  return levelMap[level] || level;
}

// Function to format the date in a more readable way
function formatDate(dateString: string): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

export async function sendApplicationEmail(formData: ApplicationFormData) {
  const subject = `${formData.name} (${formData.email})`;

  // Create HTML email content
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Yeni Başvuru</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .container {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }
        .header {
          background-color: #00205B;
          color: white;
          padding: 15px;
          border-radius: 5px 5px 0 0;
          margin: -20px -20px 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .field-value {
          padding: 5px 10px;
          background-color: #f9f9f9;
          border-radius: 3px;
        }
        .notes {
          margin-top: 20px;
          padding: 10px;
          background-color: #f5f5f5;
          border-left: 4px solid #00205B;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Yeni Başvuru Formu</h1>
        </div>
        
        <div class="field">
          <div class="field-name">İsim:</div>
          <div class="field-value">${formData.name}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Telefon:</div>
          <div class="field-value">${formData.phone}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Email:</div>
          <div class="field-value">${formData.email}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Bölüm:</div>
          <div class="field-value">${formData.department}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Çalışmanın Konu Başlığı:</div>
          <div class="field-value">${formData.subject}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Çalışmanın Seviyesi:</div>
          <div class="field-value">${formatStudyLevel(formData.level)}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Sayfa Sayısı:</div>
          <div class="field-value">${formData.pageCount}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Teslim Tarihi:</div>
          <div class="field-value">${formatDate(formData.dueDate)}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Çalışmanın Dili:</div>
          <div class="field-value">${formData.language}</div>
        </div>
        
        <div class="field">
          <div class="field-name">Uygulanacak Metot:</div>
          <div class="field-value">${formData.method}</div>
        </div>
        
        ${
          formData.notes
            ? `
        <div class="notes">
          <div class="field-name">Ek Notlar:</div>
          <div>${formData.notes.replace(/\n/g, "<br>")}</div>
        </div>
        `
            : ""
        }
        
        <div class="footer">
          Bu email Atlas Analiz başvuru formundan otomatik olarak gönderilmiştir.
          <br>
          Gönderilme Tarihi: ${new Date().toLocaleString("tr-TR")}
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, html: htmlContent }),
    });

    if (!result.ok) throw new Error("Failed to send email " + await result.json());

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
