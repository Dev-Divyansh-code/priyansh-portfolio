import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useHeroAnimation() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 640;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animations for all devices (slightly faster on mobile)
      tl.from('[data-hero-greeting]', { 
        opacity: 0, 
        y: isMobile ? 20 : 30, 
        duration: isMobile ? 0.6 : 0.8 
      })
        .from('[data-hero-name]', { 
          opacity: 0, 
          y: isMobile ? 30 : 50, 
          duration: isMobile ? 0.7 : 1 
        }, '-=0.5')
        .from('[data-hero-tagline]', { 
          opacity: 0, 
          y: isMobile ? 20 : 30, 
          duration: isMobile ? 0.5 : 0.8 
        }, '-=0.6');

      // Desktop-only decorative animations
      if (!isMobile) {
        tl.from('[data-hero-floral]', { 
          opacity: 0, 
          scale: 0, 
          rotation: -45, 
          duration: 0.9, 
          stagger: 0.15 
        }, '-=0.5')
          .from('[data-hero-badge]', { 
            opacity: 0, 
            x: (i) => (i === 0 ? -40 : 40), 
            duration: 0.7, 
            stagger: 0.2 
          }, '-=0.4');

        // Floating animation only on desktop
        gsap.to('[data-hero-floral]', {
          y: '+=12',
          rotation: '+=6',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.4,
        });
      }
    },
    { scope: ref },
  );

  return ref;
}

export function useSectionReveal() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 640;
      const header = ref.current?.querySelector('[data-section-header]');
      const items = ref.current?.querySelectorAll('[data-reveal-item]');

      // Animate header on all devices
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (header) {
        gsap.from(header, {
          scrollTrigger: {
            trigger: ref.current,
            start: isMobile ? 'top 90%' : 'top 80%',
            once: true,
          },
          opacity: 0,
          y: isMobile ? 25 : 40,
          duration: isMobile ? 0.6 : 0.9,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        });
      }

      if (items?.length) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: ref.current,
            start: isMobile ? 'top 85%' : 'top 75%',
            once: true,
          },
          opacity: 0,
          y: isMobile ? 30 : 50,
          duration: isMobile ? 0.5 : 0.7,
          stagger: isMobile ? 0.08 : 0.12,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        });
      }
    },
    { scope: ref },
  );

  return ref;
}

export function useNavbarAnimation() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.from(ref.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
      });
    },
    { scope: ref },
  );

  return ref;
}