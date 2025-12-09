import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'GSAP', icon: '🎬' },
  { name: 'Tailwind', icon: '💨' },
  { name: 'Node.js', icon: '🟢' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0, filter: 'blur(10px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Skills stagger
      gsap.fromTo('.skill-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="floating-orb w-40 h-40 sm:w-64 sm:h-64 top-20 right-0 bg-glow-secondary/20 animate-pulse-glow" />
      <div className="floating-orb w-32 h-32 sm:w-48 sm:h-48 bottom-20 left-5 sm:left-10 bg-primary/20 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section title */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
            Get to know me
          </p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative flex justify-center order-1 lg:order-none">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-glow-secondary/50 blur-2xl scale-110 animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/30 group">
                <img
                  src={profileImage}
                  alt="Ashish - Web Developer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-none">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center lg:text-left">
              Hi There, I'm <span className="text-gradient">Ashish</span>
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-center lg:text-left">
              I specialize in frontend development, crafting dynamic, visually engaging, and highly responsive websites that provide seamless user experiences. With a strong foundation in HTML, CSS, and JavaScript, I focus on building modern web interfaces that are not only aesthetically appealing but also optimized for performance and accessibility.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
              My expertise extends to advanced frameworks like React and Tailwind CSS, enabling me to create interactive, scalable, and efficient applications. Whether it's designing sleek UI components, implementing smooth animations, or enhancing user interactions, my goal is to develop web solutions that are both functional and innovative.
            </p>

            {/* Skills grid */}
            <div className="skills-grid grid grid-cols-4 gap-2 sm:gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-item skill-icon flex-col gap-1 py-2 sm:py-3"
                >
                  <span className="text-lg sm:text-xl">{skill.icon}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
