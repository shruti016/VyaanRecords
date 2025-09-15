"use client";
import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

/** sections: now using {label, href} objects */
const sections = [
  {
    title: "Recordings",
    items: [
      { label: "Guitar Recordings", href: "/studio-services/recording#guitar-recording" },
      { label: "Vocal Recordings", href: "/studio-services/recording#vocal-recording" },
      { label: "Dubbing & Voice-Overs", href: "/studio-services/recording#dubbing-voice-overs" },
      { label: "Podcast Recordings", href: "/studio-services/recording#podcast-recording" },
      { label: "Location Sound Recordings", href: "/studio-services/recording#location-sound-recording" },
    ],
  },
  {
    title: "Music Production",
    items: [
      { label: "Original Songs", href: "#" },
      { label: "Jingles/Advertisments", href: "#" },
      { label: "Short Films/ Videos", href: "#" },
      // { label: "Web Series Music", href: "#" },
      // { label: "Advertisement Music", href: "#" },
      { label: "Feature Films/ Series/OTTs", href: "#" },
    ],
  },
  {
    title: "Sound Design",
    items: [
      { label: "Advertisements", href: "#" },
      { label: "Podcasts/Videos", href: "#" },
      { label: "Films/Series/OTTs", href: "#" },
      // { label: "Song Arrangement & FX", href: "#" },
      // { label: "Mixing", href: "#" },
    ],
  },
  {
    title: "Creative Content",
    items: [
      { label: "Lyrics Writing", href: "#" },
      { label: "Script Writing", href: "#" },
      { label: "Voice-Over Content", href: "#" },
    ],
  },
  {
    title: "Mixing/Mastering",
    items: [
      { label: "Songs", href: "#" },
      { label: "Podcasts/Videos", href: "#" },
      { label: "Advertisements", href: "#" },
      { label: "Films/Series/OTTs", href: "#" },
    ],
  },

];

export default function ServiceMenu() {
  const router = useRouter();

const handleHashNav = (e, href) => {
  if (!href || !href.includes("#")) return;
  e.preventDefault();               // stop default jump
  router.push(href); // navigate with Next.js routing
  // The target page's useEffect will handle the precise offset scroll.
};

  return (
    <li className="relative group hidden md:block">
      {/* Top-level trigger is clickable to the Recording page */}
      <Link
        href="/studio-services/recording"
        className="text-[#ADB7BE] text-base md:text-lg hover:text-white whitespace-nowrap"
      >
        Studio Services
      </Link>

      {/* Hover bridge */}
      <span aria-hidden="true" className="absolute left-0 top-full h-3 w-full" />

      {/* Dropdown */}
      <div
        className={`
          invisible opacity-0 translate-y-2
          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-150
          absolute top-full left-1/2 -translate-x-1/2 mt-0 z-[60]
          bg-[#1a1a1a] border border-white/10 shadow-2xl rounded-lg p-2 w-[320px]
        `}
      >
        <ul className="divide-y divide-white/5">
          {sections.map((sec) => (
            <li key={sec.title} className="group/item relative">
              <div className="flex items-center justify-between">
  {sec.title === "Recordings" ? (
    <Link href="/studio-services/recording" className="px-3 py-2 text-white/90 hover:underline">
      {sec.title}
    </Link>
  ) : sec.title === "Music Production" ? (
    <Link href="/studio-services/music-production" className="px-3 py-2 text-white/90 hover:underline">
      {sec.title}
    </Link>
  ) : sec.title === "Sound Design" ? (
    <Link href="/studio-services/sound-design" className="px-3 py-2 text-white/90 hover:underline">
      {sec.title}
    </Link>
  ) : sec.title === "Mixing/Mastering" ? (
    <Link href="/studio-services/mastering" className="px-3 py-2 text-white/90 hover:underline">
      {sec.title}
    </Link>
  ) :sec.title === "Creative Content" ? (
    <Link href="/studio-services/creative-content" className="px-3 py-2 text-white/90 hover:underline">
      {sec.title}
    </Link>
  ): (
    <span className="px-3 py-2 text-white/90">{sec.title}</span>
  )}
  
  <ChevronRightIcon className="h-4 w-4 mr-2 text-white/70 group-hover/item:text-white" />
</div>

              {/* bridge to flyout */}
              <span aria-hidden="true" className="absolute top-0 right-[-8px] h-full w-2" />

              {/* Flyout */}
              <div
                className={`
                  pointer-events-auto hidden group-hover/item:block
                  absolute top-0 left-full ml-2
                  bg-[#1a1a1a] border border-white/10 shadow-2xl rounded-lg
                  min-w-[260px] p-2 z-[70]
                `}
              >
                <ul>
                  {sec.items.map((it) => {
                    // support both strings and {label, href}
                    const item = typeof it === "string" ? { label: it, href: "#" } : it;
                    const { label } = item;
                    let href = item.href || "#";

                    // deep-link to Recording page anchors if this is the "Recordings" section
                    if (sec.title === "Recordings" && (!item.href || item.href === "#")) {
                      const map = {
                        "Guitar Recording": "/studio-services/recording#guitar-recording",
                        "Vocal Recording": "/studio-services/recording#vocal-recording",
                        "Dubbing & Voice-Overs": "/studio-services/recording#dubbing-voice-overs",
                        "Podcast Recording": "/studio-services/recording#podcast-recording",
                        "Location Sound Recording": "/studio-services/recording#location-sound-recording",
                      };
                      href = map[label] || "/studio-services/recording";
                    }
                    if (sec.title === "Music Production" && (!item.href || item.href === "#")) {
                      const map = {
                        "Original Songs": "/studio-services/music-production#original-songs",
                        "Jingles/Advertisments": "/studio-services/music-production#jingles-advertisments",
                        "Short Films/ Videos": "/studio-services/music-production#short-films-videos",
                        "Feature Films/ Series/OTTs": "/studio-services/music-production#feature-films-series-otts",
                      };
                      href = map[label] || "/studio-services/music-production";
                    }
                    if (sec.title === "Sound Design" && (!item.href || item.href === "#")) {
                      const map = {
                        "Advertisements": "/studio-services/sound-design#advertisements",
                        "Podcasts/Videos": "/studio-services/sound-design#podcasts",
                        "Films/Series/OTTs": "/studio-services/sound-design#films-series-otts",
                      };
                      href = map[label] || "/studio-services/sound-design";
                    }
                    if (sec.title === "Mixing/Mastering" && (!item.href || item.href === "#")) {
                      const map = {
                        "Songs": "/studio-services/mastering#songs",
                        "Podcasts/Videos": "/studio-services/mastering#podcasts",
                        "Advertisements": "/studio-services/mastering#advertisements",
                        "Films/Series/OTTs": "/studio-services/mastering#films-series-otts",
                      };
                      href = map[label] || "/studio-services/mastering";
                    }
                       
                    if (sec.title === "Creative Content" && (!item.href || item.href === "#")) {
                      const map = {
                        "Lyrics Writing": "/studio-services/creative-content#lyrics-writing",
                        "Script Writing": "/studio-services/creative-content#script-writing",
                        "Voice-Over Content": "/studio-services/creative-content#voice-over-content",
                      };
                      href = map[label] || "/studio-services/creative-content";
                    }

                    return (
                      <li key={label}>
                        <Link
                          href={href}
                          onClick={(e) => handleHashNav(e, href)}
                          className="block px-3 py-2 text-[#ADB7BE] hover:text-white hover:underline"
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
