"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { sendContactEmail } from "@/lib/email"
import { ColoredHeader } from "@/components/colored-header"

interface ContactProps {
  content: {
    title: string
    description: string
    formName: string
    formEmail: string
    formMessage: string
    formButton: string
    successMessage: string
    errorMessage: string
  }
  contactInfo: {
    contactEmail: string
    phone: string
    address?: string
  }
}

export function Contact({ content, contactInfo }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      await sendContactEmail(formData, contactInfo.contactEmail)
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <ColoredHeader h={2} className="text-3xl font-bold text-center mb-4">
          {content.title}
        </ColoredHeader>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{content.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {content.formName}
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {content.formEmail}
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  {content.formMessage}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Gönderiliyor..." : content.formButton}
                <Send className="ml-2 h-4 w-4" />
              </Button>

              {status === "success" && <p className="text-green-600 text-sm mt-2">{content.successMessage}</p>}
              {status === "error" && <p className="text-red-600 text-sm mt-2">{content.errorMessage}</p>}
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-black mt-1" />
              <div>
                <h3 className="font-medium mb-1">E-posta</h3>
                <a
                  href={`mailto:${contactInfo.contactEmail}`}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {contactInfo.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-black mt-1" />
              <div>
                <h3 className="font-medium mb-1">Telefon</h3>
                <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-black transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {contactInfo.address && <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-black mt-1" />
              <div>
                <h3 className="font-medium mb-1">Adres</h3>
                <p className="text-gray-600">{contactInfo.address}</p>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </section>
  )
}
