import type { Metadata } from "next";
import { seo } from "@/data/site-content";

// Define the base URL for production and development
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atlasanaliz.com";

// Create a base metadata object that can be extended for specific pages
export function createMetadata(
  pageMetadata: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalPath?: string;
  } = {},
): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: pageMetadata.title || seo.title,
    description: pageMetadata.description || seo.description,
    keywords: seo.keywords,
    authors: [{ name: seo.author }],
    openGraph: {
      title: pageMetadata.ogTitle || pageMetadata.title || seo.ogTitle,
      description:
        pageMetadata.ogDescription ||
        pageMetadata.description ||
        seo.ogDescription,
      images: [pageMetadata.ogImage || seo.ogImage],
      url: pageMetadata.canonicalPath
        ? `${baseUrl}${pageMetadata.canonicalPath}`
        : seo.ogUrl,
      type: seo.type,
      locale: seo.locale,
      siteName: seo.siteName,
    },
    twitter: {
      card: seo.twitterCard,
      site: seo.twitterSite,
      creator: seo.twitterCreator,
      title: pageMetadata.title || seo.title,
      description: pageMetadata.description || seo.description,
      images: [pageMetadata.ogImage || seo.ogImage],
    },
    alternates: {
      canonical: pageMetadata.canonicalPath
        ? `${baseUrl}${pageMetadata.canonicalPath}`
        : seo.canonicalUrl,
    },
  };
}
