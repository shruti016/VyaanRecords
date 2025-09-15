"use client";
import React from "react";

/**
 * Full-bleed, looping background video with subtle dark vignettes
 * so the hero text stays readable (Abbey Road style).
 *
 * - Put your MP4 at:  public/videos/vyaan-trailer.mp4
 * - Put the poster at: public/images/video-poster.jpg
 */
export default function BackgroundVideo({
  src = "/videos/vyaan-trailer.mp4",
  poster = "/images/video-poster.jpg",
  className = "",
}) {
    return (
        <video
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          autoPlay
          playsInline
          muted
          loop
          poster={poster}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      );
}
