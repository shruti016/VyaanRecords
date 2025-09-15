// src/app/gallery/page.jsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";

/* ---------- DATA ---------- */
const STUDIO_IMAGES = [
  "/images/gallery/studio-1.jpg",
  "/images/gallery/studio-2.jpg",
  "/images/gallery/studio-3.jpg",
  "/images/gallery/studio-4.jpg",
  "/images/gallery/studio-5.jpg",
];

// Add BTS images later in the same order as studio images.
const BEHIND_IMAGES = [
  // "/images/gallery/behind-1.jpg",
  // "/images/gallery/behind-2.jpg",
];

const GALLERY_SECTIONS = [
  { id: "studio-space", title: "Studio Space" },
  { id: "behind-the-sessions", title: "Behind the Sessions" },
];

/* ---------- UI ---------- */
function ComingSoon() {
  return (
    <div className="absolute inset-0 grid place-items-center text-white/60 text-xs bg-white/5">
      Image coming soon
    </div>
  );
}

/** Flip card (natural aspect, no cropping)
 *  - forceBack: null (free), true (show back), false (show front)
 *  - onFlip(i, isBack): parent updates heading state
 */
function FlipCard({
  frontSrc,
  backSrc,
  i,
  forceBack = null,
  onFlip,
  altFront = "Studio image",
  altBack = "Behind the scenes image",
}) {
  const [localBack, setLocalBack] = useState(false);
  const displayedBack = forceBack ?? localBack;

  const toggle = () => {
    // If page was forcing a side, we still want user click to work:
    // parent will immediately clear force mode; we also flip local.
    const next = !displayedBack;
    setLocalBack(next);
    onFlip?.(i, next);
  };

  return (
    <div className="group relative [perspective:1000px] mb-6 sm:mb-8">
      {/* Click overlay */}
      <button
        type="button"
        onClick={toggle}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
        aria-label="Flip image"
      />
      {/* Rotating wrapper */}
      <div
        className={`relative transition-transform duration-500 [transform-style:preserve-3d] ${
          displayedBack ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT (natural height) */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] [backface-visibility:hidden]">
          {frontSrc ? (
            <img
              src={frontSrc}
              alt={altFront}
              className="w-full h-auto block"
              loading="lazy"
            />
          ) : (
            <ComingSoon />
          )}
        </div>

        {/* BACK (absolute overlay; never crops) */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {backSrc ? (
            <img
              src={backSrc}
              alt={altBack}
              className="w-full h-full object-contain bg-black/30"
              loading="lazy"
            />
          ) : (
            <ComingSoon />
          )}
        </div>
      </div>
    </div>
  );
}

/** Masonry columns with controllable cards */
function MasonryFlip({ front = [], back = [], forceBack = null, onFlip }) {
  const max = Math.max(front.length, back.length);
  const pairs = Array.from({ length: max }, (_, i) => ({
    front: front[i],
    back: back[i],
  }));

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {pairs.map((p, i) => (
        <FlipCard
          key={(p.front || p.back || "card") + i}
          i={i}
          frontSrc={p.front}
          backSrc={p.back}
          forceBack={forceBack}
          onFlip={onFlip}
        />
      ))}
    </div>
  );
}

function GridSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      {id === "behind-the-sessions" && (
        <span id="behind-the-scenes" className="block h-0" aria-hidden="true" />
      )}
      <h2 className="text-3xl md:text-[2rem] font-semibold tracking-tight text-center mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Left box – prevent scroll jump; also inform page which side to show */
function SectionNav({ sections = [], onPick }) {
  return (
    <nav className="sticky top-28 hidden xl:block self-start mt-3">
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-4">
        <p className="text-xs uppercase tracking-wider text-white/60 px-2 pb-3">
          Gallery Sections
        </p>
        <ul className="space-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault(); // <-- keep page in place
                  onPick?.(s.id);
                }}
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
    <div className="xl:hidden mt-8">
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

/* ---------- PAGE ---------- */
export default function GalleryPage() {
  // global mode: null = free, 'studio' = show fronts, 'bts' = show backs
  const [mode, setMode] = useState(null);
  // which cards are currently showing their back (for heading)
  const [backSet, setBackSet] = useState(new Set());

  const forceBack =
    mode === "bts" ? true : mode === "studio" ? false : null;

    const handleFlip = (i, isBack) => {
        if (mode !== null) {
          // We were in a forced state (Studio or BTS). As soon as the user
          // clicks a card, exit force mode AND rebuild the heading state
          // to match what’s actually on screen after this click.
          setMode(null);
          setBackSet(isBack ? new Set([i]) : new Set()); // ← heading becomes Studio if this click shows front
          return;
        }
      
        // Normal free-flip mode: add/remove just this card from the back set
        setBackSet((prev) => {
          const next = new Set(prev);
          if (isBack) next.add(i);
          else next.delete(i);
          return next;
        });
      };
      

  // Heading switches to BTS if forced OR at least one card is back
  const studioHeading =
    forceBack === true || backSet.size > 0
      ? "Behind the Sessions"
      : "Studio Space";

  return (
    <div className="min-h-screen">
      {/* Centered heading + intro */}
      <div className="mx-auto max-w-6xl px-6 pt-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mt-4">Gallery</h1>
        <p className="text-white/70 max-w-3xl mx-auto mt-4">
          A look inside our studio and sessions. Click any photo to flip between{" "}
          <span className="text-white/90">Studio Space</span> (front) and{" "}
          <span className="text-white/90">Behind the Sessions</span> (back).
        </p>
        <QuickLinks sections={GALLERY_SECTIONS} />
      </div>

      {/* Content + sidebar on xl+ */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6 pb-24 mt-10">
        <div className="grid grid-cols-1 xl:grid-cols-[260px,1fr] gap-10">
          <SectionNav
            sections={GALLERY_SECTIONS}
            onPick={(id) => {
              // flip but don't scroll
              setMode(id === "behind-the-sessions" ? "bts" : "studio");
              // keep heading consistent with the chosen side
              if (id === "studio-space") setBackSet(new Set());
              if (id === "behind-the-sessions")
                setBackSet(new Set(Array.from({ length: STUDIO_IMAGES.length }, (_, i) => i)));
            }}
          />

          <div className="space-y-16">
            {/* Studio Space – heading reacts to flips */}
            <GridSection id="studio-space" title={studioHeading}>
              <MasonryFlip
                front={STUDIO_IMAGES}
                back={BEHIND_IMAGES}
                forceBack={forceBack}
                onFlip={handleFlip}
              />
            </GridSection>

            {/* Keep anchors when BTS is empty so sidebar link still works, but show nothing */}
            {BEHIND_IMAGES.length > 0 ? (
              <GridSection id="behind-the-sessions" title="Behind the Sessions">
                <MasonryFlip
                  front={BEHIND_IMAGES}
                  back={STUDIO_IMAGES}
                  forceBack={forceBack === null ? null : !forceBack}
                  onFlip={handleFlip}
                />
              </GridSection>
            ) : (
              <>
                <span id="behind-the-sessions" className="block h-0" aria-hidden="true" />
                <span id="behind-the-scenes" className="block h-0" aria-hidden="true" />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
