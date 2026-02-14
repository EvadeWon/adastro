import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import Script from "next/script";
import { inter } from "./fonts";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "AdAstro",
  description: "AdAstro is a performance-driven digital marketing agency helping businesses scale with Meta Ads and Google Ads. We specialize in lead generation, brand growth, and revenue-focused advertising strategies in India.",
  icons: {
    // Main favicons
    icon: [
      { url: '/logo_v2.jpeg', sizes: '16x16' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>
          {children}
        </Providers>

        <Toaster position="top-center" richColors />
        {/* Organization Schema for Google logo */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AdAstro",
              "url": "https://adastro.in",
              "logo": "https://adastro.in/logo_v2.jpeg"
            }),
          }}
        />

        {/* Razorpay script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
