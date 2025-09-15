"use client";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
import { useEffect } from "react";

/* ---------------- DATA ---------------- */
const CREATIVE_CONTENT_SECTIONS = [
  {
    id: "lyrics-writing",
    title: "Lyrics Writing",
    items: [
      { title: "Pop Single – English/Hindi", img: "/images/creative content/Song writing 1.jpg", href: "#" },
      { title: "Indie Ballad – Metaphoric", img: "/images/creative content/Song writing 3.jpg", href: "#" },
      { title: "Rap Verse – Punchlines", img: "/images/creative content/Song writing 2.jpg", href: "#" },
    ],
  },
  {
    id: "script-writing",
    title: "Script Writing",
    items: [
      { title: "Ad Film – 30s : Concept & VO", img: "/images/creative content/Script 1.jpg", href: "#" },
      { title: "Podcast – Episode Outline", img: "/images/creative content/Script 3.jpg", href: "#" },
      { title: "Short Film – Narration Draft", img: "/images/creative content/Script 2.jpg", href: "#" },
    ],
  },
  {
    id: "voice-over-content",
    title: "Voice-Over Content",
    items: [
      { title: "Commercial Copy – CTA Focus", img: "/images/creative content/Voiceover 1.jpg", href: "#" },
      { title: "Explainer – Clear Structure", img: "/images/creative content/Voiceover 3.jpg", href: "#" },
      { title: "Corporate – Brand Tone", img: "/images/creative content/Voiceover 2.jpg", href: "#" },
    ],
  },
];

/* ---------------- UI ---------------- */
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
        {items.map((item, i) => (
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

/* --------------- DEFAULT EXPORT (PAGE) --------------- */
export default function CreativeContentPage() {
  // robust hash scroll with fixed-header offset (same as Sound Design)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const OFFSET = 112; // ≈ top-28 (fixed navbar)

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
      {/* Centered heading + intro */}
      <div className="mx-auto max-w-6xl px-6 pt-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold">Creative Content</h1>
        <p className="text-white/70 max-w-3xl mx-auto mt-4">
          Words that match your music and brand—lyrics, scripts, and voice-over copy
          crafted for clarity, emotion, and impact.
        </p>
        <QuickLinks sections={CREATIVE_CONTENT_SECTIONS} />
      </div>

      {/* Centered content (sidebar removed) */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6 pb-24 mt-10">
        <div className="space-y-16">
          {CREATIVE_CONTENT_SECTIONS.map((sec) => (
            <GridSection key={sec.id} {...sec} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
