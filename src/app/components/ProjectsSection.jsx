"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const works = [
  { id: 1, title: "Reliance General Insurance – Ad", image: "",
    tag: ["All","Ads"], links: [
      { label: "YouTube", url: "https://youtu.be/clFGPwVdAWc" }
    ]},
  { id: 2, title: "Saucony – Brand Video", image: "",
    tag: ["All","Ads"], links: [
      { label: "Instagram", url: "https://www.instagram.com/p/C-WWTyxIf1E/" }
    ]},
  { id: 3, title: "Sutti – Short Film", image: "",
    tag: ["All","Short Film"], links: [
      { label: "YouTube", url: "https://youtu.be/ZEnSprtm25c" }
    ]},
  { id: 4, title: "A Name – Short Film", image: "",
    tag: ["All","Short Film"], links: [
      { label: "YouTube", url: "https://youtu.be/aZrEC_m4JA0" }
    ]},
  { id: 5, title: "Aamhi Bharatache Loka – Short Film", image: "",
    tag: ["All","Short Film"], links: [
      { label: "YouTube", url: "https://youtu.be/Nku99srV-l4" }
    ]},
  { id: 6, title: "Rani Mangamma – Song", image: "",
    tag: ["All","Songs"], links: [
      { label: "YouTube", url: "https://youtu.be/rE8kknuEFzA" },
      // { label: "Spotify", url: "SPOTIFY_LINK_HERE" },
    ]},
];
export default function ProjectsSection() {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const filtered = works.filter(w => w.tag.includes(tag));
  const card = { initial:{y:50,opacity:0}, animate:{y:0,opacity:1} };

  return (
    <section id="work"className="scroll-mt-28">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">Work Showcase</h2>

      <div className="text-white flex flex-row flex-wrap justify-center items-center gap-2 py-6">
        {["All","Ads","Short Film","Songs"].map(n => (
          <ProjectTag key={n} onClick={setTag} name={n} isSelected={tag===n} />
        ))}
      </div>

      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filtered.map((w, i) => (
          <motion.li key={w.id} variants={card} initial="initial" animate={isInView?"animate":"initial"} transition={{duration:0.3, delay:i*0.2}}
            className="bg-[#181818] rounded-xl overflow-hidden border border-[#33353F]">
            <div className="relative w-full aspect-[4/3] rounded-t-xl border border-dashed border-[#33353F] bg-[#181818] flex items-center justify-center overflow-hidden">
            {w.image ? (
              <Image src={w.image} alt={w.title} fill className="object-cover"/>
            ) : (
              <span className="text-[#8b8b8b] text-sm">Poster coming soon</span>
            )}
            </div>
            <div className="p-4">
              <h3 className="text-white text-lg font-semibold">{w.title}</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {w.links.map((l, j) => (
                  <Link key={j} href={l.url} target="_blank" className="text-sm underline decoration-dotted text-[#ADB7BE] hover:text-white">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// const ProjectsSection = () => {
//   const [tag, setTag] = useState("All");
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   const handleTagChange = (newTag) => {
//     setTag(newTag);
//   };

//   const filteredProjects = projectsData.filter((project) =>
//     project.tag.includes(tag)
//   );

//   const cardVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1 },
//   };

//   return (
//     <section id="projects">
//       <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
//         My Projects
//       </h2>
//       <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
//         <ProjectTag
//           onClick={handleTagChange}
//           name="All"
//           isSelected={tag === "All"}
//         />
//         <ProjectTag
//           onClick={handleTagChange}
//           name="Web"
//           isSelected={tag === "Web"}
//         />
//         <ProjectTag
//           onClick={handleTagChange}
//           name="Mobile"
//           isSelected={tag === "Mobile"}
//         />
//       </div>
//       <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
//         {filteredProjects.map((project, index) => (
//           <motion.li
//             key={index}
//             variants={cardVariants}
//             initial="initial"
//             animate={isInView ? "animate" : "initial"}
//             transition={{ duration: 0.3, delay: index * 0.4 }}
//           >
//             <ProjectCard
//               key={project.id}
//               title={project.title}
//               description={project.description}
//               imgUrl={project.image}
//               gitUrl={project.gitUrl}
//               previewUrl={project.previewUrl}
//             />
//           </motion.li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default ProjectsSection;
