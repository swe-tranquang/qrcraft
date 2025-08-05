import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QRCraft - Modern QR Code Generator",
  description: "Create beautiful QR codes instantly. Fast, secure, and customizable QR code generator with multiple export formats.",
  keywords: ["QR code", "generator", "QR", "code", "create", "download", "custom"],
  authors: [{ name: "QRCraft Team" }],
  openGraph: {
    title: "QRCraft - Modern QR Code Generator",
    description: "Create beautiful QR codes instantly with our modern, secure generator.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
