// app/studio-services/recording/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
import { useEffect } from "react";


// === Hash scroll helper & hook (paste below imports) ===
const NAV_OFFSET_PX = 100; // ~96px navbar + a little cushion

function scrollToHash(offset = NAV_OFFSET_PX) {
  const { hash } = window.location;
  if (!hash) return;
  const id = hash.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function useHashScroll() {
  useEffect(() => {
    // run after mount
    const t = setTimeout(() => scrollToHash(), 0);

    // handle in-page hash changes (e.g., clicking another submenu item that only changes #hash)
    const onHash = () => setTimeout(() => scrollToHash(), 0);
    window.addEventListener("hashchange", onHash);

    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);
}

// ---------- DATA ----------
const RECORDING_SECTIONS = [
  {
    id: "guitar-recording",
    title: "Guitar Recordings",
    items: [
      { title: "Acoustic", img: "/images/recording/guitar-2.png"},
      { title: "Electric", img: "/images/recording/guitar 1.jpg"},
      { title: "Base", img: "/images/recording/guitar 4.jpg"},
      { title: "12-String Texture", img: "", href: "#" },
    ],
  },
  {
    id: "vocal-recording",
    title: "Vocal Recordings",
    items: [
      { title: "Male/Female Vocals", img: "/images/recording/vocal 2.jpg"},
      { title: "Main Vocals/Double Trackings", img: "/images/recording/vocal 1.jpg" },
      { title: "Specific Genre/Background Vocals", img: "/images/recording/vocal 3.jpg" },
      { title: "Choir Layering", img: "", href: "#" },
    ],
  },
  {
    id: "dubbing-voice-overs",
    title: "Dubbing & Voice-Overs",
    items: [
      { title: "Advertisements/Commercials", img: "/images/recording/dub 1.jpg", href: "#" },
      { title: "Films/Series/OTTs", img: "/images/recording/dub 2.jpg", href: "#" },
      { title: "Corporate/Audiobooks", img: "/images/recording/dub 3.jpg", href: "#" },
      { title: "Multilingual VO", img: "", href: "#" },
    ],
  },
  {
    id: "podcast-recording",
    title: "Podcast Recordings",
    items: [
      { title: "Interview Podcasts", img: "/images/recording/podcast 3.jpg"},
      { title: "Storytelling/Narrative Podcasts", img: "/images/recording/podcast 2.jpeg", href: "#" },
      { title: "Discussion/Talk Shows", img: "/images/recording/podcast 4.jpg", href: "#" },
      { title: "Narrative Series", img: "", href: "#" },
    ],
  },
  {
    id: "location-sound-recording",
    title: "Location Sound Recordings",
    items: [
      { title: "Foley", img: "/images/recording/location 1.jpg", href: "#" },
      { title: "Ambience", img: "/images/recording/location 2.jpg", href: "#" },
      { title: "Sync Sound/Dialogues", img: "/images/recording/location 5.jpg", href: "#" },
      { title: "SFX Field Capture", img: "", href: "#" },
    ],
  },
];

// ---------- UI ----------
function ShowcaseCard({ item }) {
  return (
    <Link href="/contact" className="group block">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
        <div className="relative aspect-[4/3]">
          {item.img ? (
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs bg-white/5">
              Image coming soon
            </div>
          )}
        </div>
        <div className="p-4 bg-black">
          <h4 className="text-sm font-medium text-white/90 leading-snug">
            {item.title}
          </h4>
        </div>
      </div>
    </Link>
  );
}

function GridSection({ id, title, items }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-3xl md:text-[2rem] font-semibold tracking-tight text-center mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {/* OLD: {items.map((item, i) => ( */}
        {items.slice(0, 3).map((item, i) => (
          <ShowcaseCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}


export default function RecordingPage() {
  useHashScroll(); // <-- add this line
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mt-4">
          Recordings
        </h1>
        <p className="text-white/70 max-w-3xl mx-auto text-center mt-4">
          Capture pristine performances—vocals, guitars, voice-overs, podcasts,
          and on-location sound. Explore recent work by category below.
        </p>
      </div>

      {/* Content (centered, clean) */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6 pb-24 mt-10">
        <div className="space-y-16">
          {RECORDING_SECTIONS.map((sec) => (
            <GridSection
              key={sec.id}
              id={sec.id}
              title={sec.title}
              items={sec.items}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
