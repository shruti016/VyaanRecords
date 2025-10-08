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
      <div className="relative w-full max-w-[170px] mx-auto aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-white/10 bg-[#1a1a1a]">
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
        <div className="absolute bottom-0 left-0 right-0 bg-black px-3 py-2">
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
      title: "Sutti",
      // href: "https://youtube.com/",         // replace with real link
      poster: "/images/work/Sutti poster.jpg",                           // e.g. "/images/work/larzish.jpg"
    },
    {
      title: "A Name",
      // href: "https://youtube.com/",
      poster: "/images/work/A Name poster.png",
    },
    {
      title: "Reliance-General-Insurance Ad",
      // href: "https://youtube.com/",
      poster: "/images/work/Reliance-General-Insurance.jpg",
    },
    {
      title: "Learner's License",
      // href: "https://youtube.com/",
      poster: "/images/work/Learners License poster.jpg",
    },
    {
      title: "Larzish",
      // href: "https://youtube.com/",
      poster: "/images/work/Larzish poster.jpg",
    },
    {
      title: "Kabaddi",
      // href: "https://youtube.com/",
      poster: "/images/work/Kabaddi poster.png",
    },
    {
      title: "Adani Electricity",
      // href: "https://youtube.com/",
      poster: "/images/work/Adani Electricity poster.jpg",
    },
    {
      title: "Bekhabar Kashi Tu",
      // href: "https://youtube.com/",
      poster: "/images/work/Bekhabar Kashi Tu poster.jpg",
    },
    {
      title: "Kuch Bhi",
      // href: "https://youtube.com/",
      poster: "/images/work/Kuch Bhi poster.jpg",
    },
    {
      title: "Saucony",
      // href: "https://youtube.com/",   
      poster: "/images/work/Saucony poster.jpg",
    },
    {
      title: "Aamhi Bharatache Loka",
      // href: "https://youtube.com/",   
      poster: "/images/work/Aamhi Bharatache Loka poster.jpg",
    },
    {
      title: "I think I'll go now",
      // href: "https://youtube.com/",   
      poster: "/images/work/I think I'll go now poster.jpg",
    },
    {
      title: "Mazya Navaryachi Bayko",
      // href: "https://youtube.com/",   
      poster: "/images/work/Mazya Navaryachi Bayko poster.jpg",
    },
    {
      title: "Laapata Khuda",
      // href: "https://youtube.com/",   
      poster: "/images/work/Laapata Khuda poster.jpg",
    },
    {
      title: "BUB IT",
      // href: "https://youtube.com/",   
      poster: "/images/work/Bub It Boba poster.jpg",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
       <div className="flex-grow">
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
      </div>
      <Footer />
    </main>
  );
}
