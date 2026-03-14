import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
    url: "https://getsemanicleaning.com",
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
  // verification: {
  //   google: "google-site-verification-code", // Replace with your Google verification code
  // },
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
      <head>
 
        {/* <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script> */}
      </head>
      <body className={inter.className}>
        
          {children}
       
      </body>
    </html>
  )
}



import './globals.css'