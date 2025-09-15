"use client";
import React from "react";

const HeroSection = () => {
  return (
    // spacing so the video sits neatly below your fixed navbar
    <section className="relative z-0 bg-[#121212] -mt-6 md:-mt-12 pb-14 md:pb-16">
      {/* page gutter + max width similar to the reference site */}
      <div className="mx-auto max-w-[1536px] px-4 md:px-6">
        {/* 16:9 framed video with subtle ring/shadow */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-xl ring-1 ring-white/10">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/vyaan-trailer.mp4"      // your trailer file in /public/videos
            poster="/videos/video-poster.jpg"     // your poster path as given
            autoPlay
            muted
            loop
            playsInline
            controls
            controlsList="nofullscreen nodownload noremoteplayback"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


