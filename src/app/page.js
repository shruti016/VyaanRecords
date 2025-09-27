import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#121212]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <HeroSection />
        {/* Show About right after hero so it doesn't jump to Services */}
        <AboutSection />
        {/* Put Services near the end */}
        {/* <AchievementsSection /> This is your Services section */}
      </div>
      <Footer />
    </div>
  );
}
