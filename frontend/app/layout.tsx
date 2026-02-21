import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Import your new Navbar
import { Toaster } from "sonner"; // Assuming you use Sonner for toasts

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kathasara | Read and Write Stories",
  description: "A platform for independent authors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* 2. Place it here so it's on every page */}
        
        <main>
          {children} {/* This is where your page content renders */}
        </main>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}