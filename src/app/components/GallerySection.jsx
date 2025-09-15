"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const imgs = ["studio-1.jpg","studio-2.jpg","studio-3.jpg","mics-1.jpg","mics-2.jpg"];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-16 px-4 xl:px-16 scroll-mt-28 overflow-hidden bg-[#121212]"
    >
      {/* Background logo: smaller + lifted so 'RECORDS' stays fully visible */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1.02, opacity: 0.16 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{ rotate: [-1, 1, -1], scale: [1, 1.01, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          // sizes chosen to avoid cropping at all breakpoints
          className="relative w-[90vw] h-[90vw] sm:w-[65vw] sm:h-[65vw] lg:w-[50vw] lg:h-[50vw] -translate-y-[4%]"
        >
          <Image
            src="/images/logo-white.png"   // ensure this file exists (lowercase .png)
            alt=""
            fill
            priority
            aria-hidden="true"
            className="object-contain blur-[1px] md:blur-[1.5px] opacity-18"
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imgs.map((src, i) => (
            <div
              key={i}
              className="relative w-full aspect-square overflow-hidden rounded-xl border border-[#33353F]"
            >
              <Image
                src={`/images/gallery/${src}`}
                alt={`Studio photo ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
