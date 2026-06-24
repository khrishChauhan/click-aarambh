import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
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
      <body className={`${inter.className} antialiased bg-[#061917] text-white min-h-screen flex flex-col selection:bg-[#82C21C]/30`} suppressHydrationWarning>
        <SmoothScrollProvider>
          <div className="flex flex-col min-h-screen">
            <ScrollProgress />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
