import Link from "next/link"
import { Linkedin, Twitter, Instagram } from "lucide-react"
import { ColoredHeader } from "@/components/colored-header"
import { siteInfo } from "@/data/site-content"

interface FooterProps {
  content: {
    description: string
    quickLinks: {
      title: string
      links: {
        label: string
        href: string
      }[]
    }
    copyright: string
  }
  contactInfo: {
    contactEmail: string
    phone: string
    address: string
  }
}

export function Footer({ content, contactInfo }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-xl mb-4">{siteInfo.siteName}</h3>
            <p className="text-gray-600 mb-6">{content.description}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <ColoredHeader h={3} className="font-bold mb-4">
              {content.quickLinks.title}
            </ColoredHeader>
            <ul className="space-y-2">
              {content.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-600 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColoredHeader h={3} className="font-bold mb-4">
              İletişim
            </ColoredHeader>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href={`mailto:${contactInfo.contactEmail}`} className="hover:text-black transition-colors">
                  {contactInfo.contactEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-black transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li>{contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {currentYear} {siteInfo.siteName}. {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
