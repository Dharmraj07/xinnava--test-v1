import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trusted from "./components/Trusted";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import ProblemSolution from "./components/ProblemSolution";
import DashboardPreview from "./components/DashboardPreview";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  // Use local storage for persistent user theme preferences
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("xinnava-theme");
    if (saved) return saved === "dark";
    // Default to dark mode for AI-first SaaS feel, but let users toggle to light freely
    return true;
  });

  useEffect(() => {
    const rootClass = document.body.classList;
    if (isDarkMode) {
      rootClass.add("dark");
      document.body.style.backgroundColor = "#090e1a";
    } else {
      rootClass.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
    }
    localStorage.setItem("xinnava-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-300 bg-white dark:bg-[#090e1a] text-slate-800 dark:text-slate-100">
      
      {/* Dynamic ambient grid overlay to set theme mood */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-blue-500/5 via-indigo-500/5 to-transparent pointer-events-none -z-10" />

      {/* 1. Header Navigation */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main layout contents */}
      <main className="relative">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Trusted Profiles */}
        <Trusted />

        {/* 4. Features Bento Grid */}
        <Features />

        {/* 5. Pipeline "How It Works" */}
        <HowItWorks />

        {/* 6. Traditional Paperwork vs Xinnava (Problem/Solution) */}
        <ProblemSolution />

        {/* 7. Core Interactive SaaS Dashboard Preview Playground */}
        <DashboardPreview />

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. FAQs Accordion */}
        <FAQ />

        {/* 10. Waitlist and Demo CTA Block */}
        <CTA />
      </main>

      {/* 11. Footer Category Sitemap */}
      <Footer />
    </div>
  );
}
