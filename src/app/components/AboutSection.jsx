"use client";
import React, { useState, useTransition, useEffect } from "react";
import Image from "next/image";

const VIEWS = {
  about: {
    heading: "ALLOW US TO INTRODUCE ",
    subheading: "VYAAN RECORDS",
    body: [
      "Vyaan Records is a modern creative studio dedicated to crafting original music, cinematic scores, and immersive sound experiences. From independent artists to films and brands, we bring stories to life through sound that connects, inspires, and endures.Combining artistic vision with cutting-edge production.",
      " Vyaan Records delivers music that blends emotion with innovation. Designed to feel both professional and personal, our studio offers a warm, creative space where every artist can explore their unique style a place where quality sound meets modern musical imagination.",
    ],
  },
  "Meet the Founder": {
    heading: "Meet the Founder",
    body: [
      "Vyaan Records was founded by Vyaan in 2021, a passionate music producer with over seven years of professional experience. His musical journey began at the age of three, learning the Indian classical instrument tabla, which laid the foundation for his deep understanding of rhythm and sound. Over the years, Vyaan has learned and plays 14 different instruments, showcasing his versatility and deep connection with music that transcends genres and styles.",
      "A certified Avid Pro Tools and Logic Pro user, Vyaan specializes in producing across all genres from film and series scores to commercial ads, original songs, and artist collaborations. He personally oversees every project, ensuring each client’s vision is understood, refined, and brought to life with precision and creativity. His dedication to quality, detail, and emotional depth defines the sound and spirit of Vyaan Records.",
    ],
  },
  team: {
    heading: "Team of Vyaan Records",
    body: [
      "At Vyaan Records, our team is a collective of passionate producers, sound designers, session musicians, mixing, and mastering engineers all driven by a shared vision to create powerful, high-quality audio that meets every client’s expectations. ",
      "We take the time to truly understand each project’s needs, connect with our clients on a creative level, and provide guidance aligned with current industry trends ensuring every sound we deliver is both artistically fulfilling and market-ready.",
    ],
  },
  
};

const BOXES = [
  { id: "Meet the Founder", title: "Meet the Founder", img: "/images/Meet the founder.jpg", alt: "Meet the Founder" },
  { id: "team", title: "Team", img: "/images/Team of Vyaan Records.png", alt: "Vyaan Records Team" },
  
];

export default function AboutSection() {
  const [view, setView] = useState("about");
  const [, startTransition] = useTransition();

  // Switcher that also updates the URL hash so back/forward works
  const switchTo = (id) =>
    startTransition(() => {
      setView(id);
      if (typeof window !== "undefined") {
        // pushState so Back goes to previous view (no reload)
        window.history.pushState(null, "", `#${id}`);
      }
    });

  // On mount: read hash; also listen for back/forward
  useEffect(() => {
    if (typeof window === "undefined") return;
    const applyFromHash = () => {
      const h = (window.location.hash || "#about").slice(1);
      setView(VIEWS[h] ? h : "about");
    };
    applyFromHash();
    const onPop = () => applyFromHash();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <section
      id="about"
      className="
        relative z-10
        scroll-mt-20
        pt-12 md:pt-14 lg:pt-16
        pb-14 lg:pb-16
        bg-transparent
      "
    >
      {/* Heading + copy (no card background) */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-mono tracking-tight mb-3">
          {VIEWS[view].heading}
        </h2>
        
        {/* --- New line added just below heading --- */}
        {view === "about" && (
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-mono tracking-tight mb-3">
            {VIEWS[view].subheading}
          </h3>
        )}

        {/* Back to About link shows only when not on 'about' */}
        {view !== "about" && (
          <button
            onClick={() => switchTo("about")}
            className="text-sm text-gray-400 hover:text-white underline-offset-4 hover:underline mb-5"
          >
            Back to About
          </button>
        )}

        <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-gray-300 leading-relaxed">
          {VIEWS[view].body.map((p, i) => (
            <p key={`${view}-${i}`}>{p}</p>
          ))}
        </div>
      </div>

      {/* Always-visible boxes */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {BOXES.map((b) => (
          <button
            key={b.id}
            onClick={() => switchTo(b.id)}
            className={`group relative overflow-hidden rounded-2xl border transition text-left bg-transparent
              ${view === b.id ? "border-transparent-200" : "border-white/10 hover:border-white/25"}`}
            aria-pressed={view === b.id}
          >
            <div className="relative h-32 sm:h-40 md:h-44 w-full">
              <Image
                src={b.img}
                alt={b.alt}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 600px"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition" />
            </div>
            <div className="p-3 sm:p-4 bg-black">
              <h3 className="text-lg sm:text-xl font-semibold">{b.title}</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                {b.id === "team" ? "Team of Vyaan Records" : "Music Producer/Composer/Audio Engineer"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
