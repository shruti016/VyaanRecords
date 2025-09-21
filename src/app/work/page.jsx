// src/app/work/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

/** 16:9 work-card with safe placeholder */
function WorkCard({ title, href, poster }) {
  return (
    <Link
      href={href || "#"}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <div className="relative w-full max-w-[200px] mx-auto aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-white/10 bg-[#1a1a1a]">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center select-none">
            <span className="text-sm md:text-base tracking-wide text-gray-300">
              Image Coming Soon
            </span>
          </div>
        )}

        {/* subtle overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

        {/* title strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-[2px] px-3 py-2">
          <p className="text-xs md:text-sm text-white line-clamp-1">{title}</p>
        </div>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  // Add/replace items anytime. If poster is omitted, safe placeholder shows.
  const WORK_ITEMS = [
    {
      title: "Larzish — Single (YouTube)",
      href: "https://youtube.com/",         // replace with real link
      poster: "",                           // e.g. "/images/work/larzish.jpg"
    },
    {
      title: "Background Score — Short Film",
      href: "https://youtube.com/",
      poster: "",
    },
    {
      title: "Jingle — Brand Campaign",
      href: "https://youtube.com/",
      poster: "",
    },
    {
      title: "Podcast Mix — S1E03",
      href: "https://youtube.com/",
      poster: "",
    },
    {
      title: "Sound Design — Trailer",
      href: "https://youtube.com/",
      poster: "",
    },
    {
      title: "Mastering — Live Session",
      href: "https://youtube.com/",
      poster: "",
    },
    {
      title: "Live Concert Mix",
      href: "https://youtube.com/",
      poster: "",
    },
    {
      title: "Behind The Scenes Edit",
      href: "https://youtube.com/",
      poster: "",
    },
    {
      title: "Collaborations",
      href: "https://youtube.com/",
      poster: "",
    },
    {
      title: "Demo Projects",
      href: "https://youtube.com/",
      poster: "",
    },
  ];

  return (
    <main 
      className="bg-[#000000] min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg logo 1.jpg')" }}
    >
      <div className="mx-auto max-w-[1536px] px-4 md:px-6 pt-8 pb-16 md:pb-20">
        <header className="mb-10 md:mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center mt-4">
            Work
          </h1>
        </header>

        {/* Grid of 16:9 cards — not too big, matches other pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {WORK_ITEMS.map((item, idx) => (
            <WorkCard
              key={idx}
              title={item.title}
              href={item.href}
              poster={item.poster || undefined}
            />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
