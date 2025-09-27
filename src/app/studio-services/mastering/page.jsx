// src/app/studio-services/mastering/page.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
import { useEffect } from "react";

/* ---------------- DATA ---------------- */
const MASTERING_SECTIONS = [
  {
    id: "songs",
    title: "Songs",
    items: [
      { title: "Single – Radio Master", img: "/images/mastering/Song mixing 1.jpg", href: "#" },
      { title: "Album Track – Cohesive Tone", img: "/images/mastering/Song mixing 2.jpg", href: "#" },
      { title: "Streaming Optimized – LUFS Target", img: "/images/mastering/Song mixing 3.jpg", href: "#" },
    ],
  },
  {
    id: "podcasts",
    title: "Podcasts/Videos",
    items: [
      { title: "Dialogue Clarity – Loudness Norm", img: "/images/mastering/podcast 9.jpg", href: "#" },
      { title: "Intro/Outro Glue", img: "/images/mastering/podcast 5.jpg", href: "#" },
      { title: "Ad Segment Level Match", img: "/images/mastering/podcast 7.jpg", href: "#" },
    ],
  },
  {
    id: "advertisements",
    title: "Advertisements",
    items: [
      { title: "15s/30s – Punch & Presence", img: "/images/mastering/Ads mastering 1.jpg", href: "#" },
      { title: "Brand Mnemonic – Impact", img: "/images/mastering/Ads mastering 2.jpg", href: "#" },
      { title: "Broadcast Specs – True Peak", img: "/images/mastering/Ads mastering 3.jpg", href: "#" },
    ],
  },
  {
    id: "films-series-otts",
    title: "Films/Series/OTTs",
    items: [
      { title: "Stereo Printmaster", img: "/images/mastering/Film mastering 1.jpg", href: "#" },
      { title: "M&E Conform – Delivery", img: "/images/mastering/Film mastering 2.jpg", href: "#" },
      { title: "Trailer Loudness – Spec", img: "/images/mastering/Film mastering 3.jpg", href: "#" },
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

function SectionNav({ sections = [] }) {
  // aligned with first section title (same as other pages)
  return (
    <nav className="sticky top-28 hidden xl:block self-start mt-3">
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-4">
        <p className="text-xs uppercase tracking-wider text-white/60 px-2 pb-3">
          Mixing/Mastering
        </p>
        <ul className="space-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
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
export default function MasteringPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const OFFSET = 112; // ≈ your fixed header (~top-28)
  
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
  
    // first load (covers coming from another page with #podcasts etc.)
    requestAnimationFrame(() => tryWithRetries());
  
    // same-page hash changes
    const onHashChange = () => tryWithRetries();
    window.addEventListener("hashchange", onHashChange);
  
    // once everything is loaded
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
        <h1 className="text-4xl md:text-6xl font-extrabold">Mixing/Mastering</h1>
        <p className="text-white/70 max-w-3xl mx-auto mt-4">
          Final polish and delivery-ready loudness for songs, podcasts, ads, and films—
          clarity, punch, translation, and consistent tone across all platforms.
        </p>
        <QuickLinks sections={MASTERING_SECTIONS} />
      </div>

      {/* Content + sidebar on xl+ */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6 pb-24 mt-10">
  <div className="space-y-16">
    {MASTERING_SECTIONS.map((sec) => (
      <GridSection key={sec.id} {...sec} />
    ))}
  </div>
</div>
      {/* Footer (services pages only) */}
      <Footer />
    </div>
  );
}
