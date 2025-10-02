import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberMind - Find Your Dream Job",
  description: "Discover amazing job opportunities and connect with top companies. Your career journey starts here.",
  keywords: "jobs, careers, employment, hiring, job search, developer jobs, tech jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{fontFamily: 'Satoshi, sans-serif'}}>
      <body className="font-satoshi">
        {children}
      </body>
    </html>
  );
}
