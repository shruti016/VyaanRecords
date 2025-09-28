"use client";
import React, { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import emailjs from "@emailjs/browser";


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

  async function handleSubmit(e) {
  e.preventDefault();
  const f = e.currentTarget;

  const templateParams = {
    email: f.email.value,   
    phone: f.countryCode.value + f.phone.value,  // -> {{phone}}
    subject: f.subject.value,  // -> {{subject}}
    message: f.message.value,  // -> {{message}}
  };

  try {
    console.log("EMAILJS KEYS?", {
      service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    });
    
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
    );
    alert("Message sent successfully!");
    f.reset();
    setSent(true);
  } catch (err) {
    console.error(err);
    alert("Could not send right now. Please try again.");
  }
}

  
  return (
    // Full viewport, black bg, no scroll
    <main className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* If your navbar is fixed, this top padding prevents overlap. Adjust if needed. */}
      <section className="h-full pt-[-10px]">
        {/* Page width & vertical centering to match your other pages’ rhythm */}
        <div className="mx-auto h-full max-w-5xl xl:max-w-7xl px-6 h-[calc(100svh-64px)]">
          <div className="grid h-full grid-cols-1 md:grid-cols-2 items-center gap-y-10 md:gap-x-[550px]">
            {/* LEFT: FORM (as you requested) */}
            <div className="order-1 md:order-none">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Contact Us</h1>

              {sent ? (
                <p className="text-green-400 text-sm mt-2">Email sent successfully!</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2">Contact number</label>
                    <div className="flex gap-3 w-full md:w-[600px]">
                      <select
                        name="countryCode"
                        className="rounded-lg bg-[#121317] border border-white/10 text-gray-100 text-sm px-3 py-3 focus:outline-none focus:border-white/20 min-w-[120px]"
                      >
                        <option value="+91">India +91</option>
                        <option value="+1">USA +1</option>
                        <option value="+44">UK +44</option>
                        <option value="+49">Germany +49</option>
                        <option value="+33">France +33</option>
                        <option value="+86">China +86</option>
                        <option value="+81">Japan +81</option>
                        <option value="+61">Australia +61</option>
                        <option value="+55">Brazil +55</option>
                        <option value="+7">Russia +7</option>
                        <option value="+39">Italy +39</option>
                        <option value="+34">Spain +34</option>
                        <option value="+31">Netherlands +31</option>
                        <option value="+46">Sweden +46</option>
                        <option value="+47">Norway +47</option>
                        <option value="+45">Denmark +45</option>
                        <option value="+41">Switzerland +41</option>
                        <option value="+43">Austria +43</option>
                        <option value="+32">Belgium +32</option>
                        <option value="+351">Portugal +351</option>
                        <option value="+30">Greece +30</option>
                        <option value="+90">Turkey +90</option>
                        <option value="+966">Saudi Arabia +966</option>
                        <option value="+971">UAE +971</option>
                        <option value="+965">Kuwait +965</option>
                        <option value="+974">Qatar +974</option>
                        <option value="+973">Bahrain +973</option>
                        <option value="+968">Oman +968</option>
                        <option value="+20">Egypt +20</option>
                        <option value="+27">South Africa +27</option>
                        <option value="+234">Nigeria +234</option>
                        <option value="+254">Kenya +254</option>
                        <option value="+233">Ghana +233</option>
                        <option value="+880">Bangladesh +880</option>
                        <option value="+92">Pakistan +92</option>
                        <option value="+977">Nepal +977</option>
                        <option value="+94">Sri Lanka +94</option>
                        <option value="+975">Bhutan +975</option>
                        <option value="+960">Maldives +960</option>
                      </select>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="9876543210"
                        pattern="[0-9]{10,15}"
                        inputMode="numeric"
                        onInput={(e) => {
                          // Remove any non-numeric characters
                          e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        }}
                        className="flex-1 rounded-lg bg-[#121317] border border-white/10 placeholder-white/40 text-gray-100 text-sm px-3 py-3 focus:outline-none focus:border-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">Your email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full md:w-[600px] rounded-lg bg-[#121317] border border-white/10 placeholder-white/40 text-gray-100 text-sm px-3 py-3 focus:outline-none focus:border-white/20"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm mb-2">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Project / Session"
                      className="w-full md:w-[600px] rounded-lg bg-[#121317] border border-white/10 placeholder-white/40 text-gray-100 text-sm px-3 py-3 focus:outline-none focus:border-white/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full md:w-[600px] resize-none rounded-lg bg-[#121317] border border-white/10 placeholder-white/40 text-gray-100 text-sm px-3 py-3 focus:outline-none focus:border-white/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-[600px] rounded-lg py-3 font-medium bg-[#9A4DFF] hover:bg-[#8740f0] transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT: INFO */}
            <div className="md:pl-6 flex flex-col justify-start mt-[-220px]">
              <div className="grid grid-cols-[42px_1fr] gap-y-4 gap-x-2 text-white/80 ">
                {/* emails */}
                <div className="flex items-start justify-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                    <MailIcon className="w-4 h-4" />
                  </span>
                </div>
                <div className="leading-6 text-[17px] md:text-lg">
                  <a href="mailto:info.vyaanrecords@gmail.com" className="underline hover:text-white">
                    info.vyaanrecords@gmail.com
                  </a>
                  <br />
                  <a href="mailto:vyaanrecords@gmail.com" className="underline hover:text-white">
                    vyaanrecords@gmail.com
                  </a>
                </div>

                {/* location */}
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                    <LocationIcon className="w-4 h-4" />
                  </span>
                </div>
                <div className="leading-6 flex items-center text-[17px] md:text-lg ">Pune, India</div>

                {/* socials */}
                <div />
                <div className="flex items-center gap-3">
                  <span className="text-white/90 font-medium text-[17px] md:text-lg">Follow us on:</span>
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    aria-label="Instagram"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/"
                    target="_blank"
                    aria-label="Facebook"
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
            {/* End right */}
            
          </div>
          {/* Footer pinned inside the viewport, slightly above the edge */}
        <div className="absolute inset-x-0 bottom-4">
          <Footer />
        </div>
        </div>
        
      </section>
     
    </main>
  );
}
