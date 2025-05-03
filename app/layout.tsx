import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { seo } from "@/data/site-content"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: seo.author }],
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    images: [seo.ogImage],
    url: seo.ogUrl,
    type: "website",
  },
  twitter: {
    card: seo.twitterCard,
    site: seo.twitterSite,
    creator: seo.twitterCreator,
  },
  alternates: {
    canonical: seo.canonicalUrl,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
