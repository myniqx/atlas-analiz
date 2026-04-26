"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { sendApplicationEmail } from "@/lib/email-service";
import { useState } from "react";

import { toast } from "sonner";
const fakeData = false;

type FormData = {
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
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type TouchedFields = Partial<Record<keyof FormData, boolean>>;

const today = new Date().toISOString().split("T")[0];


function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "İsim zorunludur.";
  } else if (!/^[\p{L}\s'-]+$/u.test(data.name)) {
    errors.name = "İsim yalnızca harf içerebilir.";
  } else if (data.name.trim().length < 2) {
    errors.name = "İsim en az 2 karakter olmalıdır.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Telefon zorunludur.";
  } else if (!/^[+\d\s\-()]+$/.test(data.phone)) {
    errors.phone = "Geçerli bir telefon numarası girin.";
  }

  if (!data.email.trim()) {
    errors.email = "Email zorunludur.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Geçerli bir email adresi girin.";
  }

  if (!data.department.trim()) errors.department = "Bölüm zorunludur.";

  if (!data.subject.trim()) errors.subject = "Konu başlığı zorunludur.";

  if (!data.pageCount.trim()) {
    errors.pageCount = "Sayfa sayısı zorunludur.";
  } else if (isNaN(Number(data.pageCount)) || Number(data.pageCount) < 1) {
    errors.pageCount = "Geçerli bir sayfa sayısı girin.";
  }

  if (!data.dueDate) {
    errors.dueDate = "Teslim tarihi zorunludur.";
  } else if (data.dueDate < today) {
    errors.dueDate = "Teslim tarihi geçmiş bir tarih olamaz.";
  }

  if (!data.language.trim()) errors.language = "Dil zorunludur.";

  if (!data.method.trim()) errors.method = "Metot zorunludur.";

  return errors;
}

export const RequestForm = () => {
  const [formData, setFormData] = useState<FormData>(() => {
    if (fakeData) {
      return {
        name: "Ahmet Yılmaz",
        phone: "0532 123 45 67",
        email: "ahmet@example.com",
        department: "Bilgisayar Mühendisliği",
        subject: "Yapay Zeka Araştırması",
        level: "lisans",
        pageCount: "100",
        dueDate: "2026-12-31",
        language: "Türkçe",
        method: "SPSS analizi",
        notes: "Test notları",
      };
    } else {
      return {
        name: "",
        phone: "",
        email: "",
        department: "",
        subject: "",
        level: "lisans",
        pageCount: "",
        dueDate: "",
        language: "",
        method: "",
        notes: "",
      };
    }
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (touched[name as keyof FormData]) {
        setErrors(validate(next));
      }
      return next;
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, level: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce<TouchedFields>(
      (acc, key) => ({ ...acc, [key]: true }),
      {},
    );
    setTouched(allTouched);

    const currentErrors = validate(formData);
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      // Send email with form data
      const result = await sendApplicationEmail(formData);

      if (result.success) {
        // Show success message
        toast.success("Başvurunuz Alındı", {
          description:
            "Başvurunuz email olarak gönderildi. En kısa sürede sizinle iletişime geçeceğiz.",
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          department: "",
          subject: "",
          level: "lisans",
          pageCount: "",
          dueDate: "",
          language: "",
          method: "",
          notes: "",
        });
        setErrors({});
        setTouched({});
      } else {
        throw new Error("Email sending failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Teklif gönderilirken hata oluştu.", {
        description:
          "Başvurunuz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            İsim <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            className="mt-1"
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Telefon <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="tel"
            placeholder="+90 5XX XXX XX XX"
            className="mt-1"
          />
          {touched.phone && errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            className="mt-1"
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="department" className="text-sm font-medium">
            Bölümünüz <span className="text-red-500">*</span>
          </Label>
          <Input
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="organization"
            className="mt-1"
          />
          {touched.department && errors.department && (
            <p className="mt-1 text-xs text-red-500">{errors.department}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subject" className="text-sm font-medium">
            Çalışmanın Konu Başlığı <span className="text-red-500">*</span>
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1"
          />
          {touched.subject && errors.subject && (
            <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium">
            Çalışmanızın Seviyesi <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.level}
            onValueChange={handleRadioChange}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lisans" id="lisans" />
              <Label htmlFor="lisans" className="font-normal">
                Lisans
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="tezsiz-yuksek-lisans"
                id="tezsiz-yuksek-lisans"
              />
              <Label htmlFor="tezsiz-yuksek-lisans" className="font-normal">
                Tezsiz Yüksek Lisans
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="tezli-yuksek-lisans"
                id="tezli-yuksek-lisans"
              />
              <Label htmlFor="tezli-yuksek-lisans" className="font-normal">
                Tezli Yüksek Lisans
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="doktora" id="doktora" />
              <Label htmlFor="doktora" className="font-normal">
                Doktora
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="diger" id="diger" />
              <Label htmlFor="diger" className="font-normal">
                Diğer
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="pageCount" className="text-sm font-medium">
            Sayfa Sayısı <span className="text-red-500">*</span>
          </Label>
          <Input
            id="pageCount"
            name="pageCount"
            type="number"
            min={1}
            value={formData.pageCount}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1"
          />
          {touched.pageCount && errors.pageCount && (
            <p className="mt-1 text-xs text-red-500">{errors.pageCount}</p>
          )}
        </div>

        <div>
          <Label htmlFor="dueDate" className="text-sm font-medium">
            Teslim Tarihi <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            min={today}
            value={formData.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1"
          />
          {touched.dueDate && errors.dueDate && (
            <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>
          )}
        </div>

        <div>
          <Label htmlFor="language" className="text-sm font-medium">
            Çalışmanın Dili <span className="text-red-500">*</span>
          </Label>
          <Input
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Türkçe, İngilizce vb."
            className="mt-1"
          />
          {touched.language && errors.language && (
            <p className="mt-1 text-xs text-red-500">{errors.language}</p>
          )}
        </div>

        <div>
          <Label htmlFor="method" className="text-sm font-medium">
            Uygulanacak Metot <span className="text-red-500">*</span>
          </Label>
          <Input
            id="method"
            name="method"
            value={formData.method}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="SPSS analizi, finansal analiz vb."
            className="mt-1"
          />
          {touched.method && errors.method && (
            <p className="mt-1 text-xs text-red-500">{errors.method}</p>
          )}
        </div>

        <div>
          <Label htmlFor="notes" className="text-sm font-medium">
            Eklemek istedikleriniz (opsiyonel)
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={5}
            className="mt-1"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-32"
        disabled={isSubmitting}
        style={{ backgroundColor: "#00205B" }}
      >
        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
      </Button>
    </form>
  );
};
