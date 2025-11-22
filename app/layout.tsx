import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prakhar Psychological Testing and Research Centre",
  description: "Premium psychological assessment tools and tests for professionals",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon-32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/images/favicon-48.webp", sizes: "48x48", type: "image/webp" },
      { url: "/images/favicon-192.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: [
      { url: "/images/favicon-192.webp", sizes: "192x192", type: "image/webp" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Google Analytics - Load after page becomes interactive for better performance */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6F86RVCQZW"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6F86RVCQZW');
        `}
      </Script>
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <div className="animated-bg">
          <div className="floating-orb floating-orb-1"></div>
          <div className="floating-orb floating-orb-2"></div>
          <div className="floating-orb floating-orb-3"></div>
          <div className="floating-orb floating-orb-4"></div>
        </div>
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-20 relative z-10">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}