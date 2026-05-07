import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <div id="hero">
        <HeroSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
