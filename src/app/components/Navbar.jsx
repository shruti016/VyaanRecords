"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import ServiceMenu from "./ServiceMenu";
import GalleryMenu from "./GalleryMenu";
import EquipmentMenu from "./EquipmentsMenu";
import { SEARCH_INDEX } from "../utils/searchIndex"; // adjust path if needed


// --- add just below your imports ---
const normalize = (s) =>
  s.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();

const resolveTarget = (q) => {
  const query = normalize(q);

  // exact alias
  for (const t of SEARCH_INDEX) {
    if (t.aliases.some(a => normalize(a) === query)) return t;
  }
  // contains match (fuzzy-ish)
  for (const t of SEARCH_INDEX) {
    if (t.aliases.some(a => normalize(a).includes(query) || query.includes(normalize(a)))) return t;
  }
  // starts-with fallback
  for (const t of SEARCH_INDEX) {
    if (t.aliases.some(a => normalize(a).startsWith(query))) return t;
  }
  return null;
};


const navLinks = [

  { title: "Work", path: "#work" },
  { title: "Contact", path: "/contact" },
];

const NAV_HEIGHT = 96; // h-24

const Navbar = () => {
  const [showServices, setShowServices] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // ✅ helper function to close search box
  const closeSearch = () => setShowSearch(false);

  // focus the input when the panel opens
  // prefetch top routes as soon as search opens (no visual change)
useEffect(() => {
  if (!showSearch || typeof router.prefetch !== "function") return;
  const uniquePaths = Array.from(new Set(SEARCH_INDEX.map(s => s.path)));
  uniquePaths.forEach(p => router.prefetch(p));
}, [showSearch, router]);


  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) closeSearch();
    };
    if (showSearch) window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [showSearch]);

  // close on scroll
  useEffect(() => {
    const onScroll = () => closeSearch();
    if (showSearch) window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showSearch]);

  // close on route/path change
  useEffect(() => {
    closeSearch();
  }, [pathname]);

  const onSubmit = (e) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
  
    const target = resolveTarget(query); // you already added this helper earlier
    if (target) {
      // If we're already on the page and only the hash changes, avoid a full transition
      if (pathname === target.path && target.hash) {
        const id = target.hash.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        // keep URL in sync but don't trigger scroll or rerender
        router.replace(`${target.path}${target.hash}`, { scroll: false });
      } else {
        const url = target.hash ? `${target.path}${target.hash}` : target.path;
        router.push(url);
      }
    }
  
    closeSearch();
    setQ("");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] h-24 flex items-center">
      <div className="w-full flex items-center px-6">
        {/* LEFT: logo + wordmark */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-white.PNG"
            alt="Vyaan Records"
            width={80}
            height={80}
            priority
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <span className="hidden sm:inline-block text-white font-semibold tracking-[0.18em] uppercase leading-none text-xl md:text-2xl">
            VYAAN&nbsp;RECORDS
          </span>
        </Link>

        {/* RIGHT: menu then search icon */}
        <div className="ml-auto hidden lg:flex items-center gap-6">
          {/* ✅ close search when hovering over menu */}
          <ul
            className="flex items-center gap-10 whitespace-nowrap"
            onMouseEnter={closeSearch}
          >
            <ServiceMenu />
            <GalleryMenu />
            <EquipmentMenu />
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>

          {/* SEARCH ICON */}
          <button
            aria-label="Search"
            className="text-gray-400 hover:text-white"
            onClick={() => setShowSearch((v) => !v)}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>

        {/* MOBILE: hamburger */}
        <div className="ml-auto block lg:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="p-2 text-slate-200"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-400/40 text-slate-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      
       {/* MOBILE DROPDOWN (tiny) */}
{navbarOpen && (
  <div className="fixed right-6 top-24 mt-2 w-56 rounded-lg border border-white/10 bg-[#1a1a1a] shadow-2xl lg:hidden z-[60]">
    <ul className="py-2 text-sm text-[#ADB7BE]">
      {/* Studio Services with nested subheadings */}
      <li>
        <button
          className="w-full text-left px-3 py-2 hover:text-white"
          onClick={() => setShowServices((prev) => !prev)} // add state for toggle
        >
          Studio Services
        </button>
        {showServices && (
          <ul className="ml-4 mt-1 space-y-1 text-sm">
            <li>
              <Link href="/studio-services/recording" onClick={() => setNavbarOpen(false)}
                className="block px-2 py-1 hover:text-white">Recordings</Link>
            </li>
            <li>
              <Link href="/studio-services/music-production" onClick={() => setNavbarOpen(false)}
                className="block px-2 py-1 hover:text-white">Music Production</Link>
            </li>
            <li>
              <Link href="/studio-services/sound-design" onClick={() => setNavbarOpen(false)}
                className="block px-2 py-1 hover:text-white">Sound Design</Link>
            </li>
            <li>
              <Link href="/studio-services/creative-content" onClick={() => setNavbarOpen(false)}
                className="block px-2 py-1 hover:text-white">Creative Content</Link>
            </li>
            <li>
              <Link href="/studio-services/mastering" onClick={() => setNavbarOpen(false)}
                className="block px-2 py-1 hover:text-white">Mixing/Mastering</Link>
            </li>
          </ul>
        )}
      </li>

      {/* Other top-level items */}
      <li>
        <Link href="/gallery" onClick={() => setNavbarOpen(false)}
          className="block px-3 py-2 hover:text-white">Gallery</Link>
      </li>
      <li>
        <Link href="/equipment" onClick={() => setNavbarOpen(false)}
          className="block px-3 py-2 hover:text-white">Equipment</Link>
      </li>
      <li>
        <Link href="#work" onClick={() => setNavbarOpen(false)}
          className="block px-3 py-2 hover:text-white">Work</Link>
      </li>
      <li>
        <Link href="/contact" onClick={() => setNavbarOpen(false)}
          className="block px-3 py-2 hover:text-white">Contact</Link>
      </li>
    </ul>
  </div>
)}


      {/* === SEARCH POPOVER (RIGHT SIDE, UNDER ICON) === */}
      {showSearch && (
        <div
          ref={panelRef}
          className="fixed right-6 z-[60]"
          style={{ top: NAV_HEIGHT + 8 }} // 8px below the navbar
        >
          <form
            onSubmit={onSubmit}
            className="rounded-lg bg-[#1a1a1a] border border-white/10 shadow-2xl"
          >
            <input
              ref={inputRef}
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="w-[320px] px-4 py-3 text-white placeholder-gray-400 bg-transparent outline-none"
              // ✅ closes when focus is lost
              onBlur={() => setTimeout(closeSearch, 80)}
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
