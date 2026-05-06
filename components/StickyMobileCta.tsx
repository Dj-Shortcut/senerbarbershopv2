"use client";

import { useEffect, useRef, useState } from "react";

interface StickyMobileCtaProps {
  whatsappUrl: string;
}

export default function StickyMobileCta({ whatsappUrl }: StickyMobileCtaProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    heroRef.current = document.querySelector("[data-hero-stage='true']") as HTMLElement | null;
    const heroNode = heroRef.current;

    if (!heroNode || typeof window === "undefined") {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateVisibleOnScroll = () => {
      if (!mobileQuery.matches) {
        setShowStickyCta(false);
        return;
      }

      setShowStickyCta(window.scrollY > 240);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!mobileQuery.matches) {
          setShowStickyCta(false);
          return;
        }

        setShowStickyCta(!entry.isIntersecting || window.scrollY > 240);
      },
      { threshold: 0.08 },
    );

    observer.observe(heroNode);
    updateVisibleOnScroll();

    window.addEventListener("scroll", updateVisibleOnScroll, { passive: true });
    mobileQuery.addEventListener("change", updateVisibleOnScroll);

    if (prefersReducedMotion) {
      setShowStickyCta(window.scrollY > 240);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateVisibleOnScroll);
      mobileQuery.removeEventListener("change", updateVisibleOnScroll);
    };
  }, []);

  return (
    <div className="sticky-mobile-cta sm:hidden" data-visible={showStickyCta ? "true" : "false"}>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Check drukte via WhatsApp" className="ios-glass-pill ios-glass-pill--primary">
        Check drukte
      </a>
      <a href="#prijzen" className="ios-glass-pill">
        Prijzen
      </a>
    </div>
  );
}
