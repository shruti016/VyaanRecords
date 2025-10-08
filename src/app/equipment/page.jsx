"use client";
import Image from "next/image";
import Footer from "../components/Footer";

/** Common card for every item */
const EquipCard = ({ name, folder, file, scale = 1, solidBg = false }) => (
  <div className="group max-w-[180px]"> 
    <div className={`aspect-square w-full overflow-hidden rounded-xl ring-1 ring-white/10 flex items-center justify-center ${solidBg ? "bg-white" : "bg-[#1a1a1a]"}`}>
      <Image
         src={file?.startsWith("/")
          ? file
          : `/images/gallery/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`}
        alt={name}
        width={800}
        height={800}
        className="h-full w-full object-contain"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
    <p className="mt-3 text-center text-sm md:text-base text-gray-300">{name}</p>
  </div>
);

/** Generic section block */
const Section = ({ id, title, folder, items }) => (
  <section id={id} className="scroll-mt-24 md:scroll-mt-28">
    <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide mb-4">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 justify-start">
    {items.map((i) => (
   <EquipCard
     key={i.name}
     name={i.name}
     folder={folder}
     file={i.file}
     scale={i.scale}
     solidBg={i.solidBg}
   />
 ))}
    </div>
  </section>
);

export default function EquipmentPage() {
  // === DATA: edit only filenames later ===
  const DAWS = [
    { name: "Apple Logic Pro X", file: "Apple Logic Pro X.png", solidBg: true, scale: 1.90 },
    { name: "Avid Pro Tools", file: "Avid Pro Tools.png",   solidBg: true, scale: 1.18 },
  ];

  const MICROPHONES = [
    { name: "Neumann U87", file: "Neumann U87-1.jpg", solidBg: false, scale: 1.25 },
    { name: "AKG C414 XLII", file: "AKG C414 XLII.jpg", solidBg: false, scale: 1.25 },
    { name: "Neumann KM184", file: "Neumann KM184.jpg", solidBg: false, scale: 1.22 },
    { name: "Shure SM7B", file: "Shure SM7B.jpg", solidBg: false, scale: 1.25 },
    { name: "Shure SM58", file: "Shure SM58.jpg", solidBg: false, scale: 1.24 },
    { name: "Shure SM57", file: "Shure SM57.jpg", solidBg: false, scale: 1.25 },
  ];
  

  const INTERFACES = [
    { name: "Universal Audio Apollo X8", file: "universal-audio-apollo-x8.jpg", solidBg: false, scale: 1.58 },
  ];

  const MONITORS = [
    { name: "Neumann KH310", file: "Neuman KH310.png" },
  ];

  const PLUGINS = [
    { name: "Universal Audio", file: "universal-audio.png", solidBg: true, scale: 1 },
    { name: "Waves", file: "Waves.png", solidBg: true, scale: 1 },
    { name: "Soundtoys", file: "Soundtoys1.png" },
    { name: "Neural DSP", file: "Neural DSP1.png",solidBg: true, scale: 1.25 },
    { name: "Native Instruments", file: "Native Instruments.png", solidBg: true, scale: 1 },
    { name: "FabFilter", file: "FabFilter.jpg",solidBg: true, scale: 1},
    { name: "iZotope", file: "iZotope1.png",solidBg: true, scale: 1 },
    { name: "Spectrasonics", file: "Spectrasonic.jpg",solidBg: true, scale: 0.9 },
    { name: "SpitFire Audio", file: "Spitfire Audio1.jpg",solidBg: true, scale: 1.20 },
    { name: "Arturia", file: "Arturia keylab1.jpg" },
    { name: "Swar Systems", file: "Swar Systems.png",solidBg: true, scale: 1 },
    { name: "Valhalla DSP", file: "Valhalla DSP.png", solidBg: true, scale: 1.05},
    { name: "Antares", file: "Antares.png", solidBg: true, scale: 0.9},
    { name: "Roli", file: "Roli.png", solidBg: true, scale: 1},
    { name: "Ample Sound", file: "Ample Sound.png", solidBg: true, scale: 0.9 },
  ];

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1536px] px-4 md:px-6 pt-8 pb-16 md:pb-20">
        <header className="mb-10 md:mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center mt-4">
            Equipments
          </h1>
        </header>

        <div className="space-y-12 md:space-y-16">
          <Section id="daws" title="DAWs" folder="DAWs" items={DAWS} />
          <Section id="microphones" title="Microphones" folder="Microphones" items={MICROPHONES} />
          <Section id="interfaces" title="Interfaces" folder="Interfaces" items={INTERFACES} />
          <Section id="monitors" title="Studio Monitors / Speakers" folder="Studio Monitor & Speakers" items={MONITORS} />
          <Section id="plugins" title="Plugins / VSTs" folder="Plugins & VSTs" items={PLUGINS} />
        </div>
        
      </div>
      <Footer />
    </main>
  );
}
