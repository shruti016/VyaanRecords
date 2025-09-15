"use client";
import React from "react";
import Link from "next/link";

const sections = [
  { title: "DAWs", items: ["Apple Logic Pro X", "Avid Pro Tools"] },
  { title: "Microphones", items: ["Neumann U87", "AKG C414 XLII", "Neumann KM184", "Shure SM7B", "Shure SM7", "Shure SM8"] },
  { title: "Interfaces", items: ["Universal Audio Apollo X8"] },
  { title: "Studio Monitors / Speakers", items: ["Neumann KH310"] },
  {
    title: "Plugins & VSTs",
    items: [
      "Waves","Spectrasonics","Universal Audio","Arturia KeyLab",
      "Native Instruments (Kontakt & Komplete)","Ample Sound","Roli","Swar Systems",
      "SpitFire Audio","Soundtoys","Neural DSP","iZotope","FabFilter","Antares","Valhalla DSP",
    ],
  },
];

const ids = {
  "DAWs": "daws",
  "Microphones": "microphones",
  "Interfaces": "interfaces",
  "Studio Monitors / Speakers": "monitors",
  "Plugins & VSTs": "plugins",
};

export default function EquipmentMenu() {
  return (
    <li className="relative group hidden md:block">
      {/* ✅ Top-level trigger now a Link */}
      <Link
        href="/equipment"
        className="text-[#ADB7BE] text-base md:text-lg hover:text-white cursor-pointer"
      >
        Equipment
      </Link>

      {/* Hover bridge */}
      <span aria-hidden="true" className="absolute left-0 top-full h-3 w-full" />

      {/* Dropdown */}
      <div
        className={`
          invisible opacity-0 translate-y-2
          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-150
          absolute top-full left-1/2 -translate-x-1/2 mt-0
          z-[60]
          bg-[#1a1a1a] border border-white/10 shadow-2xl rounded-lg
          p-2 w-[320px]
        `}
      >
        <ul className="divide-y divide-white/5">
          {sections.map((sec) => (
            <li key={sec.title} className="group/item relative">
              <Link
                href={`/equipment#${ids[sec.title] ?? ""}`}
                className="block px-3 py-2 text-white/90 hover:text-white hover:underline"
              >
                {sec.title}
              </Link>
              <span aria-hidden="true" className="absolute top-0 right-[-8px] h-full w-2" />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
