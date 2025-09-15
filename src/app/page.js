import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import EquipmentSection from "./components/EquipmentSection";
import GallerySection from "./components/GallerySection";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
  <HeroSection />
  {/* Show About right after hero so it doesn't jump to Services */}
  <AboutSection />
  {/* Then gallery, equipment, work */}
  {/* <GallerySection /> */}
  {/* <EquipmentSection /> */}
  {/* <ProjectsSection /> */}

  {/* Put Services near the end */}
  {/* <AchievementsSection /> This is your Services section */}

  {/* Contact stays last */}
  {/* <Contact /> */}
  
</div>


      <Footer />
    </main>
  );
}
