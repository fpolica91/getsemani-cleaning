import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Getsemani Cleaning Services",
    template: "%s | Getsemani Cleaning"
  },
  description: "Professional cleaning services for homes and businesses in the area. Quality, reliability, and attention to detail.",
  keywords: ["cleaning", "house cleaning", "commercial cleaning", "janitorial services", "maid service", "professional cleaning"],
  authors: [{ name: "Getsemani Cleaning" }],
  creator: "Getsemani Cleaning",
  publisher: "Getsemani Cleaning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
    url: "https://getsemani.pro",
    title: "Getsemani Cleaning Services",
    description: "Professional cleaning services for homes and businesses in the area. Quality, reliability, and attention to detail.",
    siteName: "Getsemani Cleaning",
    images: [{
      url: "/logo.png",
      width: 1200,
      height: 630,
      alt: "Getsemani Cleaning Services"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Getsemani Cleaning Services",
    description: "Professional cleaning services for homes and businesses in the area. Quality, reliability, and attention to detail.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://getsemani.pro",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
