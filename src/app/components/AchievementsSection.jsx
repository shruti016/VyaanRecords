"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  { title: "Music Production", bullets: ["Original songs", "Artist production", "Arrangements"] },
  { title: "Sound Design", bullets: ["Film/Ad SFX", "Foley & ambience", "Creative design"] },
  { title: "Mixing & Mastering", bullets: ["Stereo mixes", "Streaming-ready masters"] },
  { title: "Background Scores", bullets: ["Short films", "Series", "Brand videos"] },
  { title: "Ghost Production", bullets: ["Artist projects", "Confidential delivery"] },
  { title: "Recording", bullets: ["Vocals & instruments", "Session management"] },
];

export default function AchievementsSection() {
  return (
    <section
      id="services"
      className="relative py-8 sm:py-16 px-4 xl:px-16 scroll-mt-28 overflow-hidden bg-[#121212]"
    >
      {/* Background logo — smaller + lifted so "RECORDS" is visible */}
      <motion.div
        // stop bloom animation: initial == animate
        initial={{ scale: 1.02, opacity: 0.16 }}
        animate={{ scale: 1.02, opacity: 0.16 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          // stop rotation + scale animation
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[100vw] h-[100vw] sm:w-[78vw] sm:h-[78vw] lg:w-[44vw] lg:h-[65vw] -translate-y-[10%]"
        >
          <Image
            src="/images/logo-white.png"   // ensure file exists, lowercase name
            alt=""
            fill
            priority
            aria-hidden="true"
            className="object-contain blur-[1px] md:blur-[1.5px] opacity-20"
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white mb-10 text-center">Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="border border-[#33353F] rounded-xl p-6 bg-[#181818]">
              <h3 className="text-white text-xl font-semibold mb-3">{s.title}</h3>
              <ul className="text-[#ADB7BE] list-disc pl-5 space-y-1">
                {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
