import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omni-video-ai.org"

const siteDescription =
  "Omni Video lets you generate Sora 2 videos from prompts with secure APIMart processing, 720p-1080p options, and live task status."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Omni Video",
  title: {
    default: "Omni Video: Sora 2 AI Video Generator",
    template: "%s | Omni Video"
  },
  description: siteDescription,
  keywords: ["Omni Video", "Omni Video AI", "Sora 2 video generator", "AI video generator", "text to video AI", "Sora 2 Pro", "APIMart video API"],
  authors: [{ name: "Omni Video" }],
  creator: "Omni Video",
  publisher: "Omni Video",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Omni Video",
    title: "Omni Video: Sora 2 AI Video Generator",
    description: siteDescription,
    images: ["/placeholder-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omni Video: Sora 2 AI Video Generator",
    description: siteDescription,
    images: ["/placeholder-logo.png"],
    creator: "@omnivideo",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "Omni Video",
        url: siteUrl,
        logo: `${siteUrl}/placeholder-logo.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: "Omni Video",
        url: siteUrl,
        description: siteDescription,
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}#app`,
        name: "Omni Video",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description: siteDescription,
        featureList: [
          "Text-to-video prompt generation",
          "Sora 2 and Sora 2 Pro model selection",
          "720p, 1024p, and 1080p resolution options",
          "16:9 landscape and 9:16 portrait generation",
          "Server-side APIMart task polling",
        ],
        creator: {
          "@id": `${siteUrl}#organization`,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  }

  return (
    <html lang="en" className="dark bg-black">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn("min-h-screen bg-black font-sans antialiased selection:bg-cyan-500/20", inter.variable)}>
        {children}
      </body>
    </html>
  )
}
