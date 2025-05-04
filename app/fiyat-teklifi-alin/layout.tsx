import type React from "react";
import type { Metadata } from "next";
import { pageMetadata, seo } from "@/data/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  ...pageMetadata.fiyat,
  canonicalPath: "/fiyat-teklifi-alin",
});

export default function PricePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
