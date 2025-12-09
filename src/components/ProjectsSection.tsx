import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: '3D Interactive Web',
    description: 'Frontend email solution with 3D elements and smooth animations.',
    image: project1,
    tags: ['React', 'Spline', 'GSAP'],
  },
  {
    id: 2,
    title: '3D Gaming UI',
    description: 'Next-level gaming interface with immersive 3D web design.',
    image: project2,
    tags: ['React', 'Three.js', 'Tailwind'],
  },
  {
    id: 3,
    title: '3D Portfolio',
    description: 'Creative developer portfolio with stunning 3D visuals.',
    image: project3,
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 4,
    title: 'Gaming Website',
    description: 'Dynamic gaming platform with vibrant anime-style graphics.',
    image: project4,
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 5,
    title: 'Animation Portfolio',
    description: 'Portfolio showcasing top web animation tools and techniques.',
    image: project5,
    tags: ['React', 'GSAP', 'Spline'],
  },
  {
    id: 6,
    title: 'Animated Portfolio',
    description: 'Step-by-step animated portfolio with smooth transitions.',
    image: project6,
    tags: ['CSS', 'JS', 'GSAP'],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.projects-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo('.project-card',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="floating-orb w-48 h-48 sm:w-72 sm:h-72 top-40 -left-24 sm:-left-36 bg-primary/15 animate-pulse-glow" />
      <div className="floating-orb w-40 h-40 sm:w-56 sm:h-56 bottom-20 right-0 bg-glow-secondary/15 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section title */}
        <div className="projects-title text-center mb-10 sm:mb-16">
          <p className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
            My Work
          </p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>

        {/* Projects grid - Bento style */}
        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group p-1 ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden rounded-xl mb-3 sm:mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Action buttons */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border hover:border-primary transition-colors">
                    <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border hover:border-primary transition-colors">
                    <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-secondary/50 text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
