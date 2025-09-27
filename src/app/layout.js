import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import PropTypes from "prop-types";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vyaan Records",
  description: "Music Producer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link
          rel="preload"
          as="video"
          href="/videos/vyaan-trailer.mp4"
          type="video/mp4"
        />
      </head>

      {/* add safe-area + overflow-x guard — does NOT alter desktop look */}
      <body className={`${inter.className} bg-[#0b0b0b] text-white overflow-x-hidden safe-area-t safe-area-b min-h-screen`}>
        <Navbar />
        {/* keep your existing top padding (matches fixed nav height) */}
        <main className="pt-20 sm:pt-24 min-h-screen">{children}</main>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

