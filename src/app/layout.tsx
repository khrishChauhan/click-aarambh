import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import { ScrollProgress } from "@/components/MicroConversions/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Click Aarambh | Growth Engineering",
  description: "Technology-driven growth engineering and scalable infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#061917] text-white min-h-screen selection:bg-[#82C21C]/30`} suppressHydrationWarning>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
