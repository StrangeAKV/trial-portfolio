import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate name reveal
    tl.from(nameRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const currentProgress = Math.round(this.progress() * 100);
        setProgress(currentProgress);
      },
    }, '-=0.3');

    // After loading complete
    tl.to({}, {
      duration: 0.3,
      onComplete: () => {
        // Fade out preloader
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = 'none';
            }
            onComplete();
          },
        });
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] spotlight opacity-50" />
      
      {/* Floating orbs */}
      <div className="floating-orb w-64 h-64 -top-20 -left-20 animate-pulse-glow" />
      <div className="floating-orb w-48 h-48 -bottom-20 -right-20 animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gradient"
        >
          Ashish
        </h1>

        {/* Progress bar container */}
        <div className="w-64 md:w-80 h-1 bg-secondary rounded-full overflow-hidden mb-4">
          <div
            ref={progressBarRef}
            className="progress-bar h-full"
            style={{ width: '0%' }}
          />
        </div>

        {/* Percentage */}
        <span
          ref={percentRef}
          className="text-muted-foreground text-sm tracking-widest"
        >
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
