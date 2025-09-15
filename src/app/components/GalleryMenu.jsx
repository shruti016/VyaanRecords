"use client";
import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

/**
 * Dropdown for "Gallery"
 * - Opens on hover (no arrow on top)
 * - Flicker-free using hover bridge
 * - Simple single-level list (no flyouts needed)
 */

const items = [
  "Studio Space",
  "Behind the Sessions",
];

export default function GalleryMenu() {
  // map labels -> anchors on the /gallery page
  const hrefMap = {
    "Studio Space": "/gallery#studio-space",
    "Behind the Sessions": "/gallery#behind-the-scenes",
    // label differs from section id; link to the correct anchor
    
  };

  return (
    <li className="relative group hidden md:block">
      {/* Top-level trigger -> go to the gallery page */}
      <Link href="/gallery" className="text-[#ADB7BE] text-base md:text-lg hover:text-white cursor-pointer">
         Gallery
      </Link>


      {/* Hover bridge under heading */}
      <span aria-hidden="true" className="absolute left-0 top-full h-3 w-full" />

      {/* Dropdown panel */}
      <div
        className={`
          invisible opacity-0 translate-y-2
          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-150
          absolute top-full left-1/2 -translate-x-1/2 mt-0
          z-[60]
          bg-[#1a1a1a] border border-white/10 shadow-2xl rounded-lg
          p-2 w-[240px]
        `}
      >
        <ul className="divide-y divide-white/5">
          {items.map((label) => (
            <li key={label}>
              <Link
                href={hrefMap[label] || "/gallery"}
                className="block px-3 py-2 text-[#ADB7BE] hover:text-white hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
