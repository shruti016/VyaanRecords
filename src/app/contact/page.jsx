"use client";
import React, { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";


/* Minimal inline icons (stroke/currentColor) */
const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
    <path d="m22 8-10 6L2 8" />
  </svg>
);

const LocationIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H8.4v-2.9h2.04V9.41c0-2.02 1.2-3.13 3.04-3.13.88 0 1.8.16 1.8.16v1.98h-1.02c-1 0-1.31.62-1.31 1.26v1.51h2.23l-.36 2.9h-1.87V22c4.78-.75 8.44-4.92 8.44-9.94Z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.98 3.5A2.49 2.49 0 1 0 5 8.48a2.49 2.49 0 0 0-.02-4.98ZM3.5 9h3v12h-3V9Zm6 0h2.86v1.64h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.63 2.01 3.63 4.62V21h-3v-5.3c0-1.26-.02-2.88-1.76-2.88-1.77 0-2.04 1.38-2.04 2.8V21h-3V9Z" />
  </svg>
);
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_G9PYvn7Xp9bfeifhV");

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);

    const f = e.currentTarget;

    // Read EmailJS config from env (must be NEXT_PUBLIC_* to be exposed client-side)
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setIsSending(false);
      toast.error("Email service is not configured. Please try again later.");
      console.error("Missing EmailJS env vars: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
      return;
    }

    const templateParams = {
      from_email: f.email.value,
      subject: f.subject.value,
      message: f.message.value,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setSent(true);
      f.reset();
      toast.success("Email sent successfully! We'll get back to you soon.");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  
  return (
    // Responsive layout optimized for desktop viewport
    <main className="min-h-screen bg-black text-white">
      {/* Proper spacing for fixed navbar */}
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 lg:pb-16">
        {/* Responsive container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center lg:min-h-[calc(100vh-120px)]">
            {/* LEFT: FORM */}
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 lg:mb-8">Contact Us</h1>

              {sent ? (
                <div className="text-center py-6 lg:py-8">
                  <p className="text-green-400 text-lg font-medium">Email sent successfully!</p>
                  <p className="text-gray-400 text-sm mt-2">We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm sm:text-base mb-2 font-medium">Your email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg bg-[#121317] border border-white/10 placeholder-white/40 text-gray-100 text-sm sm:text-base px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 focus:outline-none focus:border-white/20 focus:ring-2 focus:ring-[#9A4DFF]/20 transition-all"
                      disabled={isSending}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm sm:text-base mb-2 font-medium">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Project / Session"
                      className="w-full rounded-lg bg-[#121317] border border-white/10 placeholder-white/40 text-gray-100 text-sm sm:text-base px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 focus:outline-none focus:border-white/20 focus:ring-2 focus:ring-[#9A4DFF]/20 transition-all"
                      disabled={isSending}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm sm:text-base mb-2 font-medium">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about your project..."
                      className="w-full resize-vertical rounded-lg bg-[#121317] border border-white/10 placeholder-white/40 text-gray-100 text-sm sm:text-base px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 focus:outline-none focus:border-white/20 focus:ring-2 focus:ring-[#9A4DFF]/20 transition-all"
                      disabled={isSending}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg py-2.5 sm:py-3 lg:py-3.5 font-medium bg-[#9A4DFF] hover:bg-[#8740f0] active:bg-[#7a3ae8] transition-colors focus:ring-2 focus:ring-[#9A4DFF]/50 focus:ring-offset-2 focus:ring-offset-black min-h-[44px] text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT: INFO */}
            <div className="order-1 lg:order-2 lg:pl-6 xl:pl-8">
              <div className="grid grid-cols-[36px_1fr] sm:grid-cols-[42px_1fr] gap-y-3 sm:gap-y-4 lg:gap-y-5 gap-x-3 text-white/80">
                {/* emails */}
                <div className="flex items-start justify-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 text-white">
                    <MailIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </div>
                <div className="leading-5 sm:leading-6 text-sm sm:text-base">
                  <a href="mailto:info.vyaanrecords@gmail.com" className="underline hover:text-white break-all">
                    info.vyaanrecords@gmail.com
                  </a>
                  <br />
                  <a href="mailto:vyaanrecords@gmail.com" className="underline hover:text-white break-all">
                    vyaanrecords@gmail.com
                  </a>
                </div>

                {/* location */}
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 text-white">
                    <LocationIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </div>
                <div className="leading-5 sm:leading-6 flex items-center text-sm sm:text-base">Pune, India</div>

                {/* socials */}
                <div />
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="text-white/90 font-medium text-sm sm:text-base">Follow us on:</span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                      href="https://www.instagram.com/"
                      target="_blank"
                      aria-label="Instagram"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                    <Link
                      href="https://www.facebook.com/"
                      target="_blank"
                      aria-label="Facebook"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/"
                      target="_blank"
                      aria-label="LinkedIn"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      <LinkedInIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
    </main>
  );
}
