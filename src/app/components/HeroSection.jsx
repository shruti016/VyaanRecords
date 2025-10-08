"use client";
import React, { useRef, useState, useEffect } from "react";

const HeroSection = () => {
  const vidRef = useRef(null);
  const [muted, setMuted] = useState(true); // start muted (necessary for autoplay)

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {}); // try to keep it playing after toggle
  }, [muted]);

  return (
    // spacing so the video sits neatly below your fixed navbar
    <section id="home-hero" className="relative z-0 bg-[#121212] sm:mt-8 lg:mt-4 pb-8 sm:pb-12 md:pb-16">
      <div className="hero-bg-layer" aria-hidden="true" />
      {/* page gutter + max width similar to the reference site */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 16:9 framed video with subtle ring/shadow */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg sm:rounded-xl shadow-xl ring-1 ring-white/10">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/Final Trailer.mp4"      // your trailer file in /public/videos
            poster="/videos/video-poster.jpg"     // your poster path as given
            autoPlay
            muted={muted}
            loop
            playsInline
          />
          {/* Mute/Unmute control */}
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs font-medium text-white hover:bg-black/80 transition"
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


