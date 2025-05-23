import * as React from "react";

export interface ApplicationFormData {
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

export const ApplicationEmail = (formData: ApplicationFormData) => {
  const fieldStyle = { marginBottom: "15px" };
  const fieldNameStyle = { fontWeight: "bold", marginBottom: "5px" };
  const fieldValueStyle = {
    padding: "5px 10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "3px",
  };
  const notesStyle = {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderLeft: "4px solid #00205B",
  };
  const footerStyle = {
    marginTop: "30px",
    fontSize: "12px",
    color: "#777",
    textAlign: "center" as const,
  };

  const formatLevel = (level: string) =>
    ({
      lisans: "Lisans",
      "tezsiz-yuksek-lisans": "Tezsiz Yüksek Lisans",
      "tezli-yuksek-lisans": "Tezli Yüksek Lisans",
      doktora: "Doktora",
      diger: "Diğer",
    })[level] || level;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("tr-TR");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <div
        style={{
          maxWidth: "600px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#00205B",
            color: "white",
            padding: "15px",
            borderRadius: "5px 5px 0 0",
            margin: "-20px -20px 20px",
          }}
        >
          <h1 style={{ fontSize: "24px", margin: 0 }}>Yeni Başvuru Formu</h1>
        </div>

        {[
          ["İsim", formData.name],
          ["Telefon", formData.phone],
          ["Email", formData.email],
          ["Bölüm", formData.department],
          ["Çalışmanın Konu Başlığı", formData.subject],
          ["Çalışmanın Seviyesi", formatLevel(formData.level)],
          ["Sayfa Sayısı", formData.pageCount],
          ["Teslim Tarihi", formatDate(formData.dueDate)],
          ["Çalışmanın Dili", formData.language],
          ["Uygulanacak Metot", formData.method],
        ].map(([label, value], i) => (
          <div key={i} style={fieldStyle}>
            <p style={fieldNameStyle}>{label}:</p>
            <p style={fieldValueStyle}>{value}</p>
          </div>
        ))}

        {formData.notes && (
          <div style={notesStyle}>
            <p style={fieldNameStyle}>Ek Notlar:</p>
            <p>{formData.notes}</p>
          </div>
        )}

        <p style={footerStyle}>
          Bu email Atlas Analiz başvuru formundan otomatik olarak
          gönderilmiştir.
          <br />
          Gönderilme Tarihi: {new Date().toLocaleString("tr-TR")}
        </p>
      </div>
    </div>
  );
};

export default ApplicationEmail;
