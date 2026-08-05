import { Metadata } from "next";
import ContactHero from "@/components/Contact/ContactHero";
import ContactChannels from "@/components/Contact/ContactChannels";
import ContactForm from "@/components/Contact/ContactForm";
import ContactTrust from "@/components/Contact/ContactTrust";

export const metadata: Metadata = {
  title: "Contact | Click Aarambh",
  description: "Initiate partnership. Let's build something that scales.",
};

export default function ContactPage() {
  return (
    <main className="noise bg-[#061917]" aria-label="Contact Page">
      {/* 1 — Contact Hero */}
      <ContactHero />

      {/* 2 — Contact Channels */}
      <ContactChannels />

      {/* 3 — Contact Form */}
      <ContactForm />

      {/* 4 — Trust Panel */}
      <ContactTrust />

    </main>
  );
}
