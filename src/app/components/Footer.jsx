import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    // removed all border classes -> no thin white line
    <footer className="text-white bg-[#0b0b0b]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center">
        {/* logo on the left (same position, bigger) */}
        <Image
          src="/images/Logo/logo-white.png"
          alt="Vyaan Records"
          width={56}
          height={56}
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
          priority
        />

        {/* push text slightly more to the right */}
        <p className="ml-auto pr-2 sm:pr-6 text-slate-500 text-xs sm:text-sm">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
