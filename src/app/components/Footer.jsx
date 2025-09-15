import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    // removed all border classes -> no thin white line
    <footer className="text-white">
      <div className="container mx-auto px-12 py-8 flex items-center">
        {/* logo on the left (same position, bigger) */}
        <Image
          src="/images/logo-white.PNG"   // put the file at public/images/logo-only.png
          alt="Vyaan Records"
          width={56}
          height={56}
          className="w-12 h-12 md:w-14 md:h-14"
          priority
        />

        {/* push text slightly more to the right */}
        <p className="ml-auto pr-6 text-slate-500 text-sm">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
