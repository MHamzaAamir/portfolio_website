import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from 'lenis/react'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hamza's Portfolio",
  description: "My portfolio website for showcasing my projects, skills, etc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactLenis root/>
        {children}   
      </body>
    </html>
  );
}
