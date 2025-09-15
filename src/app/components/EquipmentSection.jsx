"use client";
import React from "react";

const gear = [
  // Send me your exact list; for now add items like:
  "DAWs: Logic Pro X, Pro Tools",
  "Microphones: (models here)",
  "Audio Interface: (model)",
  "Monitors: (model)",
  "Instruments: Guitar, Keyboard, Tabla, Percussion",
];

export default function EquipmentSection() {
  return (
    <section id="equipment" className="py-16 px-4 xl:px-16 scroll-mt-28">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Equipment</h2>
      <div className="max-w-3xl mx-auto">
        <ul className="text-[#ADB7BE] list-disc pl-6 space-y-2">
          {gear.map((g,i)=><li key={i}>{g}</li>)}
        </ul>
      </div>
    </section>
  );
}
