"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormFields {
  name: string;
  phone: string;
  email: string;
  scope: string;
}

interface FormError {
  field?: keyof FormFields | "global";
  message: string;
}

export default function ContactForm() {
  const reducedMotion = useReducedMotion() ?? false;
  const router = useRouter();
  const [formState, setFormState] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<FormError | null>(null);
  const [fields, setFields] = useState<FormFields>({
    name: "",
    phone: "",
    email: "",
    scope: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFields((prev) => ({ ...prev, [id]: value }));
    // Clear error on the field the user is editing
    if (error?.field === id) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          phone: fields.phone,
          email: fields.email,
          scope: fields.scope,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError({ field: "global", message: data.error ?? "Something went wrong. Please try again." });
        setFormState("idle");
        return;
      }

      router.push("/thank-you");
    } catch {
      setError({
        field: "global",
        message: "Network error. Please check your connection and try again.",
      });
      setFormState("idle");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#0D2E26]/10 bg-white p-4 text-[#0D2E26] placeholder-white/20 backdrop-blur-md transition-all duration-300 focus:border-[#70BA28] focus:bg-[#70BA28]/5 focus:outline-none focus:ring-1 focus:ring-[#70BA28]/50";

  const inputErrorClass =
    "w-full rounded-lg border border-red-500/50 bg-red-500/5 p-4 text-[#0D2E26] placeholder-white/20 backdrop-blur-md transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50";

  return (
    <section className="relative w-full bg-[#F4F7F5] py-24 border-t border-[#0D2E26]/10">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl">

          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0D2E26] md:text-4xl mb-4">
              Initiate Discovery.
            </h2>
            <p className="text-[#2E4D45] leading-relaxed max-w-lg">
              Provide us with the context of your current bottleneck. We will review your infrastructure and reach out to schedule a technical assessment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

            {/* Global Error Banner */}
            {error?.field === "global" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3"
              >
                <p className="font-mono text-[11px] text-red-400">{error.message}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name Field */}
              <div className="group relative">
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#4B635D] transition-colors group-focus-within:text-[#70BA28]"
                >
                  Full Name <span className="text-[#70BA28]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={fields.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Jane Doe"
                />
              </div>

              {/* Phone Field */}
              <div className="group relative">
                <label
                  htmlFor="phone"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#4B635D] transition-colors group-focus-within:text-[#70BA28]"
                >
                  Phone Number <span className="text-[#70BA28]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="group relative">
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#4B635D] transition-colors group-focus-within:text-[#70BA28]"
              >
                Work Email
              </label>
              <input
                type="email"
                id="email"
                value={fields.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="jane@company.com"
              />
            </div>

            {/* Scope Field */}
            <div className="group relative">
              <label
                htmlFor="scope"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#4B635D] transition-colors group-focus-within:text-[#70BA28]"
              >
                Project Scope / Bottleneck
              </label>
              <textarea
                id="scope"
                value={fields.scope}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Describe the current architecture and where the friction lies..."
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#0D2E26]/20 bg-[#0D2E26]/5 px-8 py-4 transition-all duration-300 hover:border-[#70BA28]/50 hover:bg-[#70BA28]/10 hover:shadow-[0_0_20px_rgba(112,186,40,0.2)] outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28] disabled:opacity-50 md:w-auto"
              >
                <span className="relative z-10 font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D2E26] transition-colors group-hover:text-[#70BA28]">
                  {formState === "submitting" ? "Transmitting..." : "Submit Discovery Request"}
                </span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
