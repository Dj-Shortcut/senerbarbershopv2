"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "./Reveal";

export interface GalleryItem {
  id: string;
  title: string;
  imageSrc: string;
  aspect?: "portrait" | "square";
}

export interface GalleryProps {
  items?: GalleryItem[];
  className?: string;
}

const defaultItems: GalleryItem[] = [
  { id: "signature-fade", title: "Signature Fade", imageSrc: "/assets/images/signature-fade.jpg", aspect: "portrait" },
  { id: "skin-fade", title: "Skin Fade", imageSrc: "/assets/images/skin-fade.jpg", aspect: "portrait" },
  { id: "classic-cut", title: "Classic Cut", imageSrc: "/assets/images/classic-cut.jpg", aspect: "portrait" },
  { id: "beard-detail", title: "Beard Detail", imageSrc: "/assets/images/beard-detail.jpg", aspect: "portrait" },
  { id: "precision-line-up", title: "Precision Line-up", imageSrc: "/assets/images/precision-line-up.jpg", aspect: "portrait" },
  { id: "texture-crop", title: "Texture Crop", imageSrc: "/assets/images/texture-crop.jpg", aspect: "portrait" },
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
          <article className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-lg shadow-black/30 backdrop-blur">
            <div ref={videoMountRef} className="aspect-video">
              {shouldRenderVideo ? (
                <video
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "50% 20%" }}
                  controls={prefersReducedMotion}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  autoPlay={!prefersReducedMotion}
                  aria-label="Featured clip"
                >
                  <source src="/assets/video/featured-clip.mp4" type="video/mp4" />
                </video>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-900 px-4 text-center">
                  <p className="text-sm text-zinc-300">Featured clip loads as you approach this section.</p>
                </div>
              )}
            </div>
          </article>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {items.map((item, index) => {
            const aspectClass = item.aspect === "square" ? "aspect-square" : "aspect-[4/5]";

            return (
              <Reveal key={item.id} delayMs={index * 40}>
                <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-md shadow-black/30">
                  <div className={`${aspectClass} relative w-full overflow-hidden`}>
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                      className="object-cover transition duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-110 motion-reduce:transform-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/0 transition group-hover:from-black/45" />
                    <div className="absolute bottom-0 left-0 right-0 m-3 rounded-lg border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-sm sm:m-4">
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
