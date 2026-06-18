import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Approach } from "./components/Approach";
import { Portfolio } from "./components/Portfolio";
import { WhyArnevo } from "./components/WhyArnevo";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const handleTalkClick = () => {
    const contactSection = document.getElementById("iletisim");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreClick = () => {
    const portfolioSection = document.getElementById("islerimiz");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-wild-sand flex flex-col text-mirage relative select-none">
      {/* Premium Navbar */}
      <Navbar />

      {/* Main Single Page Sections App Flow */}
      <main className="flex-grow pt-24 lg:pt-0">
        
        {/* 1. Hero Section */}
        <Hero onTalkClick={handleTalkClick} onExploreClick={handleExploreClick} />

        {/* 2. Hakkımızda (About) - Dark Mirage Background */}
        <About />

        {/* 3. Hizmetler (Services) - Light Mint/Pastel Wild Sand Backdrop */}
        <Services />

        {/* 4. Yaklaşım (Approach Timeline) - Rich Deep Sea Green Backdrop */}
        <Approach />

        {/* 5. İşler / Portfolio Grid with Detailed Modal Popovers */}
        <Portfolio />

        {/* 6. Neden Arnevo - Dark Mirage Background */}
        <WhyArnevo />

        {/* 7. İletişim (Creative Intake Form with state changes) */}
        <Contact />

      </main>

      {/* Premium Studio Footer */}
      <Footer />
    </div>
  );
}
