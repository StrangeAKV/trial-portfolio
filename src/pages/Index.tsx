import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useLenis } from '@/hooks/useLenis';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize smooth scroll after loading
  useLenis(!isLoading);

  useEffect(() => {
    // Add loading class to body
    document.body.classList.add('loading');
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.classList.remove('loading');
  };

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={handleLoadingComplete} />

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
