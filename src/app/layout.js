import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";     
     

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vyaan Records",
  description: "Music Producer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          as="video"
          href="/videos/vyaan-trailer.mp4"
          type="video/mp4"
        />
      </head>
      <body className={`${inter.className} bg-[#0b0b0b] text-white`}>
      <Navbar />
      <main className="pt-24">{children}</main>
     
      </body>
    </html>
  );
}
