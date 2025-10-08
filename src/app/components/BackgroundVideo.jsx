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
  src = "/videos/Final Trailer.mp4",
  poster = "/images/video-poster.jpg",
  className = "",
}) {
  const vidRef = useRef(null);
  const [muted, setMuted] = useState(true); // start muted so autoplay always works

  // Try to (re)play whenever mute state changes (esp. iOS)
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = muted;
    // attempt to play; browsers ignore if already playing
    v.play().catch(() => {});
  }, [muted]);
    return (
      <div className={`relative ${className}`}>
        <video
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          autoPlay
          playsInline
          muted={muted}
          loop
          poster={poster}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
         {/* Mute/Unmute button (small, unobtrusive) */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute background video" : "Mute background video"}
        className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 backdrop-blur px-3 py-1 text-xs font-medium text-white hover:bg-black/70 transition"
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
      );
}
