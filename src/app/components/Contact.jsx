"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* Inline SVG icons */
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

const Contact = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };
    const response = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await response.json();
    if (response.status === 200) setEmailSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 scroll-mt-28 overflow-hidden bg-[#121212]"
    >
      {/* BACKGROUND: blurred logo */}
      <motion.div
        initial={{ opacity: 0.22 }}
        animate={{ opacity: 0.22 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div className="relative w-[100vw] max-w-[900px] aspect-square">
          <Image
            src="/images/logo-white.png"
            alt="Vyaan Records emblem"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 820px"
            className="object-contain blur-[7px] opacity-30 scale-[1.18] md:scale-[1.25]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 64%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 64%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[#121212]" />
        </div>
      </motion.div>

      {/* LEFT: Contact info */}
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white my-4">Contact Us</h2>

        <div className="mt-6 text-[#ADB7BE] grid grid-cols-[42px_1fr] gap-y-6 gap-x-3">
          {/* Row 1: Mail */}
          <div className="flex items-start justify-center">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
              <MailIcon className="w-4 h-4" />
            </span>
          </div>
          <div className="leading-6">
            <a href="mailto:info.vyaanrecords@gmail.com" className="underline hover:text-white">
              info.vyaanrecords@gmail.com
            </a>
            <br />
            <a href="mailto:vyaanrecords@gmail.com" className="underline hover:text-white">
              vyaanrecords@gmail.com
            </a>
          </div>

          {/* Row 2: Location */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
              <LocationIcon className="w-4 h-4" />
            </span>
          </div>
          <div className="leading-6 flex items-center translate-y-[1px]">
            Pune, India
          </div>

          {/* Row 3: Socials */}
          <div /> {/* empty cell for alignment */}
          <div className="flex items-center gap-3">
            <span className="text-white/90 font-medium">Follow us on:</span>
            <Link
              href="https://www.instagram.com/reel/C_QOC_TPhZX/"
              target="_blank"
              aria-label="Instagram"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
            >
              <InstagramIcon className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              aria-label="Facebook Page"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
            >
              <FacebookIcon className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              aria-label="LinkedIn"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
            >
              <LinkedInIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="relative z-10">
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">Email sent successfully!</p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="text-white block text-sm mb-2 font-medium">
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Project / Session"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="text-white block text-sm mb-2 font-medium">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
