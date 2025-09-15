"use client";
import React, { useState, useTransition, useEffect } from "react";
import Image from "next/image";

const VIEWS = {
  about: {
    heading: "ALLOW US TO INTRODUCE OURSELVES…",
    body: [
      "Vyaan Records is the home of music creation. A creative studio delivering compositions, sound design, and mixes for ads, films, and indie artists.",
      "With classical training and modern sound design, we’re shaping unique sonic experiences that move stories forward.",
      "From soulful tracks to cinematic scores, we aim to empower a new generation of artists and storytellers.",
    ],
  },
  team: {
    heading: "Team of Vyaan Records",
    body: [
      "Meet the passionate creators behind Vyaan Records — sound engineers, producers, and musicians working together to deliver world-class compositions and audio post-production.",
      "We’re a small, focused crew that treats every brief like a score: intent, feel, and precision.",
    ],
  },
  vision: {
    heading: "Vision",
    body: [
      "To blend classical roots with modern production and become Pune’s hub for cutting-edge sound innovation.",
      "We champion indie voices, cinematic storytelling, and craft that stands the test of time.",
    ],
  },
};

const BOXES = [
  { id: "team", title: "Team", img: "/images/gallery/team-placeholder.jpg", alt: "Vyaan Records Team" },
  { id: "vision", title: "Vision", img: "/images/gallery/vision-placeholder.jpg", alt: "Vision" },
];

export default function AboutSection() {
  const [view, setView] = useState("about");
  const [isPending, startTransition] = useTransition();

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
      <div className="mx-auto max-w-none px-4 sm:px-6 lg:px-10 text-center">
        <h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3"
          // Optional: click heading to go back to About
          onClick={() => view !== "about" && switchTo("about")}
          role={view !== "about" ? "button" : undefined}
        >
          {VIEWS[view].heading}
        </h2>

        {/* Back to About link shows only when not on 'about' */}
        {view !== "about" && (
          <button
            onClick={() => switchTo("about")}
            className="text-sm text-gray-400 hover:text-white underline-offset-4 hover:underline mb-5"
          >
            Back to About
          </button>
        )}

        <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
          {VIEWS[view].body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* Always-visible boxes */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {BOXES.map((b) => (
          <button
            key={b.id}
            onClick={() => switchTo(b.id)}
            className={`group relative overflow-hidden rounded-2xl border transition text-left bg-transparent
              ${view === b.id ? "border-purple-500" : "border-white/10 hover:border-white/25"}`}
            aria-pressed={view === b.id}
          >
            <div className="relative h-44 w-full">
              <Image
                src={b.img}
                alt={b.alt}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-gray-400">
                {b.id === "team" ? "Who we are and how we work" : "What drives our studio forward"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
