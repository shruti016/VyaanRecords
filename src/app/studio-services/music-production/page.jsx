"use client";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
import { useEffect } from "react"; // ← added

/* ------------------- DATA ------------------- */
const MUSIC_PROD_SECTIONS = [
  {
    id: "original-songs",
    title: "Original Songs",
    items: [
      { title: "Indie Pop – Demo A", img: "/images/music production/Original 1.jpg", href: "#" },
      { title: "Soul Ballad – Demo B", img: "/images/music production/Original 3.jpg", href: "#" },
      { title: "Alt Rock – Demo C", img: "/images/music production/Original 5.jpg", href: "#" },
      { title: "Hindi Pop – Demo D", img: "", href: "#" },
    ],
  },
  {
    id: "jingles-advertisments",
    title: "Jingles/Advertisments",
    items: [
      { title: "Retail Brand – 10s Jingle", img: "/images/music production/Jingle 1.jpg", href: "#" },
      { title: "App Launch – 15s Tune", img: "/images/music production/Jingle 3.jpg", href: "#" },
      { title: "Brand Mnemonic – 4 Notes", img: "/images/music production/Jingle 2.jpg", href: "#" },
      { title: "Festival Promo – 12s", img: "", href: "#" },
    ],
  },
  {
    id: "short-films-videos",
    title: "Short Films/Videos",
    items: [
      { title: "Drama Score – Theme", img: "/images/music production/Short Film 1.jpg", href: "#" },
      { title: "Thriller Motif – Pulse", img: "/images/music production/Short Film 2.jpg", href: "#" },
      { title: "Family Montage – Warmth", img: "/images/music production/Short Film 3.jpg", href: "#" },
      { title: "Credits Cue – Outro", img: "", href: "#" },
    ],
  },
  {
    id: "feature-films-series-otts",
    title: "Feature Films/Series/OTTs",
    items: [
      { title: "Main Theme – Orchestral", img: "/images/music production/Feature film 1.jpg", href: "#" },
      { title: "Action Cue – Hybrid", img: "/images/music production/Feature film 3.jpg", href: "#" },
      { title: "Emotional Cue – Strings", img: "/images/music production/Feature film 2.jpg", href: "#" },
      { title: "End Credits – Suite", img: "", href: "#" },
    ],
  },
];

/* ------------------- UI ------------------- */
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

/* ------------------- DEFAULT EXPORT (no sidebar) ------------------- */
export default function MusicProductionPage() {
  // === hash-scroll with fixed header offset, robust on route transitions ===
  useEffect(() => {
    if (typeof window === "undefined") return;

    const OFFSET = 112; // ≈ your fixed navbar height (~top-28)

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

    requestAnimationFrame(() => tryWithRetries()); // on first mount (e.g., .../music-production#short-films-videos)

    const onHashChange = () => tryWithRetries(); // same-page hash changes
    window.addEventListener("hashchange", onHashChange);

    const onLoad = () => tryWithRetries(); // after full load
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 pt-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold">Music Production</h1>
        <p className="text-white/70 max-w-3xl mx-auto mt-4">
          End-to-end production for songs, jingles, ads, films, and series—
          composition, arrangement, sound selection, and final deliverables tailored to your brief.
        </p>
      </div>

      {/* Centered content */}
      <div className="mx-auto max-w-6xl px-6 pb-24 mt-10">
        <div className="space-y-16">
          {MUSIC_PROD_SECTIONS.map((sec) => (
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
