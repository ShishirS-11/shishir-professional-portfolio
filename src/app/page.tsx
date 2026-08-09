import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CareerFocus from "@/components/CareerFocus";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-[#F5F7F6]">
      <Navbar />

      <Hero />

      <About />

      <CareerFocus />

      <Projects />

      <Skills />

      <Experience />

      <Education />

      <Certifications />

      <Achievements />

      <Contact />

      <Footer />
    </main>
  );
}