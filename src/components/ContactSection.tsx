import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Send, Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.contact-title',
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

      // Form inputs animation
      gsap.fromTo('.form-field',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );

      // Contact info animation
      gsap.fromTo('.contact-info-item',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
          },
        }
      );

      // Social icons animation
      gsap.fromTo('.social-icon',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.social-icons',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="floating-orb w-40 h-40 sm:w-64 sm:h-64 top-20 right-10 sm:right-20 bg-primary/15 animate-pulse-glow" />
      <div className="floating-orb w-32 h-32 sm:w-48 sm:h-48 bottom-40 left-5 sm:left-10 bg-glow-secondary/15 animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section title */}
        <div className="contact-title text-center mb-10 sm:mb-16">
          <p className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
            Get In Touch
          </p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4 max-w-lg mx-auto px-4">
            Have a project in mind or just want to say hello? Drop me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 order-2 lg:order-none">
            <div className="form-field">
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass-input w-full text-sm sm:text-base"
                placeholder="John Doe"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input w-full text-sm sm:text-base"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="glass-input w-full resize-none text-sm sm:text-base"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="submit-btn glow-button w-full flex items-center justify-center gap-2 text-sm sm:text-base py-3 sm:py-4"
            >
              <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-none">
            <div className="contact-info-item glass-card p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">Email</h4>
                  <a href="mailto:hello@ashish.dev" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm break-all">
                    hello@ashish.dev
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info-item glass-card p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">Phone</h4>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info-item glass-card p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">Location</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="social-icons pt-2 sm:pt-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Connect with me</p>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/50 flex items-center justify-center border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Github size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/50 flex items-center justify-center border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Linkedin size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/50 flex items-center justify-center border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Twitter size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
