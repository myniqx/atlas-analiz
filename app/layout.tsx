import { Chat } from "@/components/chat";
import { ThemeProvider } from "@/components/theme-provider";
import { contactInfo, pageMetadata } from "@/data/site-content";
import { createMetadata } from "@/lib/metadata";
import { Inter } from "next/font/google";
import Script from "next/script";
import type React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AboutUs } from "@/components/sections/about-us";
import { Hero } from "@/components/sections/hero";
import { BackgroundImage } from "@/components/background-image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
<Script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KR5M7CRH');</Script>
        <meta name="google-site-verification" content="5J-ao5JNWSuoUDV3Rq4Wt1cM-0w4889pcYJVJidZ2Dk" />
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
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KR5M7CRH"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative">
            <BackgroundImage />
            <Navbar />
            {children}
            <Footer />
          </main>

          <Chat />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
