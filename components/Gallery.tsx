"use client";

import { useEffect, useRef, useState } from "react";

import Reveal from "./Reveal";

export interface GalleryItem {
  id: string;
  title: string;
  aspect?: "portrait" | "square";
}

export interface GalleryProps {
  items?: GalleryItem[];
  className?: string;
}

const defaultItems: GalleryItem[] = [
  { id: "signature-fade", title: "Signature Fade", aspect: "portrait" },
  { id: "skin-fade", title: "Skin Fade", aspect: "portrait" },
  { id: "beard-detail", title: "Beard Detail", aspect: "portrait" },
  { id: "classic-cut", title: "Classic Cut", aspect: "portrait" },
  { id: "lineup", title: "Precision Line-up", aspect: "portrait" },
  { id: "texture-crop", title: "Texture Crop", aspect: "portrait" },
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

export default function Gallery({ items = defaultItems, className = "" }: GalleryProps) {
  const videoMountRef = useRef<HTMLDivElement | null>(null);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = videoMountRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRenderVideo(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "300px 0px", threshold: 0.01 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`w-full py-12 sm:py-16 ${className}`.trim()} aria-labelledby="gallery-heading">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Gallery</p>
          <h2 id="gallery-heading" className="mt-2 text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Crafted Looks
          </h2>
        </div>

        <Reveal>
          <article className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-white">
            <div ref={videoMountRef} className="aspect-video">
              {shouldRenderVideo ? (
                <video
                  className="h-full w-full object-cover"
                  controls
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  autoPlay={!prefersReducedMotion}
                  aria-label="Featured clip"
                >
                  <source src="/featured-clip.mp4" type="video/mp4" />
                </video>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-800 px-4 text-center">
                  <p className="text-sm text-slate-200">Featured clip loads as you approach this section.</p>
                </div>
              )}
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-medium">Featured clip</p>
              <p className="text-xs text-slate-300">Bekijk onze latest cut reel in de gallery.</p>
              {prefersReducedMotion ? (
                <p className="mt-1 text-xs text-slate-300">Autoplay is disabled to respect reduced-motion preferences.</p>
              ) : null}
            </div>
          </article>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {items.map((item, index) => {
            const aspectClass = item.aspect === "square" ? "aspect-square" : "aspect-[4/5]";

            return (
              <Reveal key={item.id} delayMs={index * 40}>
                <article className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800/80 backdrop-blur">
                  <div className={`${aspectClass} w-full`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-zinc-100/5" />
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
