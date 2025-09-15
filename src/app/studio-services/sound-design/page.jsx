"use client";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
import { useEffect } from "react";

const SOUND_DESIGN_SECTIONS = [
  {
    id: "advertisements",
    title: "Advertisements",
    items: [
      { title: "15s TVC – Punchy FX", img: "/images/sound design/Sound Ads 1.jpg", href: "#" },
      { title: "Beauty Ad – Glossy Sweeteners", img: "/images/sound design/Sound Ads 2.jpg", href: "#" },
      { title: "Sports Promo – Hits & Whooshes", img: "/images/sound design/Sound Ads 3.jpg", href: "#" },
      { title: "Retail Spot – Logo Stinger", img: "", href: "#" },
    ],
  },
  {
    id: "podcasts",
    title: "Podcasts/Videos",
    items: [
      { title: "Intro/Outro Idents", img: "/images/sound design/Sound podcast 2.jpeg", href: "#" },
      { title: "Chapter Markers – Stems", img: "/images/sound design/Sound podcast 4.jpg", href: "#" },
      { title: "SFX Beds – Narrative Show", img: "/images/sound design/Sound podcast 5.jpg", href: "#" },
      { title: "Ad Read Sweeteners", img: "", href: "#" },
    ],
  },
  {
    id: "films-series-otts",
    title: "Films/Series/OTTs",
    items: [
      { title: "Dialog Polish – Clean & Warm", img: "/images/sound design/Sound Film 1.jpg", href: "#" },
      { title: "Atmos Beds – City/Nature", img: "/images/sound design/Sound film 2.jpg", href: "#" },
      { title: "Tension FX – Risers/Drops", img: "/images/sound design/Sound film 3.jpg", href: "#" },
      { title: "Credits Hit – Impact Tail", img: "", href: "#" },
    ],
  },
];

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
        <div className="p-4">
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
      {items.slice(0, 3).map((item, i) => (
          <ShowcaseCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

function QuickLinks({ sections = [] }) {
  return (
    <div className="hidden mt-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10"
          >
            {s.title}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SoundDesignPage() {
  // robust hash scroll with fixed-header offset
  useEffect(() => {
    if (typeof window === "undefined") return;

    const OFFSET = 112; // ≈ top-28

    const scrollToId = (id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
      return true;
    };

    const scrollToHash = () => {
      const { hash } = window.location;
      if (!hash) return false;
      return scrollToId(decodeURIComponent(hash.slice(1)));
    };

    const tryWithRetries = (n = 12) => {
      if (scrollToHash()) return;
      if (n <= 0) return;
      setTimeout(() => tryWithRetries(n - 1), 60);
    };

    requestAnimationFrame(() => tryWithRetries());
    const onHashChange = () => tryWithRetries();
    window.addEventListener("hashchange", onHashChange);
    const onLoad = () => tryWithRetries();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Centered heading */}
      <div className="mx-auto max-w-6xl px-6 pt-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold">Sound Design</h1>
        <p className="text-white/70 max-w-3xl mx-auto mt-4">
          Narrative-driven sound for ads, films, songs, and podcasts—clean dialog,
          immersive atmospheres, ear-candy, and polished mixes that elevate the story.
        </p>
        <QuickLinks sections={SOUND_DESIGN_SECTIONS} />
      </div>

      {/* Centered content (sidebar removed) */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6 pb-24 mt-10">
        <div className="space-y-16">
          {SOUND_DESIGN_SECTIONS.map((sec) => (
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
