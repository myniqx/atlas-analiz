import { Chat } from "@/components/chat";
import { ThemeProvider } from "@/components/theme-provider";
import { contactInfo, pageMetadata } from "@/data/site-content";
import { createMetadata } from "@/lib/metadata";
import { Inter } from "next/font/google";
import Script from "next/script";
import type React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata = createMetadata(pageMetadata.home);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsapp = contactInfo.whatsapp;
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* <!-- Google tag (gtag.js) --> */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_ATLAS_ANALIZ && (
          <>
            <Script
              src={
                "https://www.googletagmanager.com/gtag/js?id=" +
                process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_ATLAS_ANALIZ
              }
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_ATLAS_ANALIZ}');
          `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Chat />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
