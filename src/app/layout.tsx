"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/form/sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current path

  // Check if the path is 'login' or 'signup', and if so, do not render Sidebar
  const showSidebar = !(pathname === "/login" || pathname === "/signup" || pathname === "/");

  return (
    <html lang="en" className={inter.className}>
      <body>
        {showSidebar ? <Sidebar>{children}</Sidebar> : children} {/* Conditionally render Sidebar */}
      </body>
    </html>
  );
}

