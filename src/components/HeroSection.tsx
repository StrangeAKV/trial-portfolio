import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Headline animation
      tl.fromTo(headlineRef.current,
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
      );

      // Subtitle animation
      tl.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // CTA animation
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      // Floating orbs animation
      gsap.to('.hero-orb', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-sM5SKgJDd4M1HKkwRWAZj57f/"
          frameBorder="0"
          className="w-full h-full"
          style={{ pointerEvents: 'auto' }}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] spotlight z-[1]" />
      
      {/* Floating orbs */}
      <div className="hero-orb floating-orb w-48 h-48 sm:w-72 sm:h-72 top-20 -left-24 sm:-left-36 bg-primary/20 z-[1]" />
      <div className="hero-orb floating-orb w-32 h-32 sm:w-48 sm:h-48 bottom-40 left-10 sm:left-20 bg-glow-secondary/20 z-[1]" style={{ animationDelay: '1s' }} />
      <div className="hero-orb floating-orb w-40 h-40 sm:w-56 sm:h-56 top-40 right-5 sm:right-10 bg-primary/15 z-[1]" style={{ animationDelay: '2s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] z-[1]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
            Web Developer
          </p>
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6"
          >
            Hi, I'm{' '}
            <span className="text-gradient">Ashish</span>
            <br />
            <span className="text-muted-foreground text-2xl sm:text-3xl md:text-5xl lg:text-6xl">Web Developer</span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-6 sm:mb-8 px-4"
          >
            Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
          </p>
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="glow-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
          >
            Hire Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-xs text-muted-foreground tracking-widest">SCROLL</span>
        <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
