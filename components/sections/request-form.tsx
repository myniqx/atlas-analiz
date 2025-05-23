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

export const RequestForm = () => {
  const [formData, setFormData] = useState(() => {
    if (fakeData) {
      return {
        name: "John Doe",
        phone: "1234567890",
        email: "john.doe@example.com",
        department: "Computer Science",
        subject: "AI Research",
        level: "lisans",
        pageCount: "100",
        dueDate: "2023-12-31",
        language: "English",
        method: "Qualitative",
        notes: "Sample notes for testing",
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, level: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Telefon <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1"
          />
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
            required
            className="mt-1"
          />
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
            required
            className="mt-1"
          />
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
            required
            className="mt-1"
          />
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
            value={formData.pageCount}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="dueDate" className="text-sm font-medium">
            Teslim Tarihi <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="mt-1"
          />
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
            placeholder="Türkçe, İngilizce vb."
            required
            className="mt-1"
          />
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
            placeholder="SPSS analizi, finansal analiz vb."
            required
            className="mt-1"
          />
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
