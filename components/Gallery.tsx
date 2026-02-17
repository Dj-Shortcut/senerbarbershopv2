"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import Reveal from "./Reveal";

const featuredVideos = [
  {
    id: "featured-clip",
    src: "/assets/video/featured-clip.mp4",
    poster: "/assets/images/signature-fade.jpg",
    objectPosition: "50% 15%",
    ariaLabel: "Featured haircut clip",
  },
  {
    id: "hero-alt-bg",
    src: "/assets/video/hero-alt-bg.mp4",
    poster: "/assets/images/classic-cut.jpg",
    objectPosition: "50% 20%",
    ariaLabel: "Alternative featured haircut clip",
  },
] as const;

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
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const pointerStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const goToSlide = (index: number) => {
    const total = featuredVideos.length;
    const normalized = ((index % total) + total) % total;
    setActiveSlide(normalized);
  };

  const goToPreviousSlide = () => {
    goToSlide(activeSlide - 1);
  };

  const goToNextSlide = () => {
    goToSlide(activeSlide + 1);
  };

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

  useEffect(() => {
    if (!shouldRenderVideo) {
      return;
    }

    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      const shouldPlay = index === activeSlide && !prefersReducedMotion;

      if (!shouldPlay) {
        video.pause();
        return;
      }

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Ignore autoplay restrictions; user interaction via controls can still play.
        });
      }
    });
  }, [activeSlide, prefersReducedMotion, shouldRenderVideo]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
    isDragging.current = true;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || pointerStartX.current === null || prefersReducedMotion) {
      return;
    }

    setDragOffsetPx(event.clientX - pointerStartX.current);
  };

  const finishSwipe = (endX: number) => {
    if (pointerStartX.current === null) {
      return;
    }

    const deltaX = endX - pointerStartX.current;
    const threshold = 50;

    if (deltaX <= -threshold) {
      goToNextSlide();
    } else if (deltaX >= threshold) {
      goToPreviousSlide();
    }

    pointerStartX.current = null;
    isDragging.current = false;
    setDragOffsetPx(0);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishSwipe(event.clientX);
  };

  const handlePointerCancel = () => {
    pointerStartX.current = null;
    isDragging.current = false;
    setDragOffsetPx(0);
  };

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
            <div ref={videoMountRef} className="relative aspect-video overflow-hidden">
              {shouldRenderVideo ? (
                <div
                  className="group relative h-full w-full touch-pan-y"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  onPointerLeave={handlePointerCancel}
                >
                  <div
                    className="flex h-full"
                    style={{
                      width: `${featuredVideos.length * 100}%`,
                      transform: `translateX(calc(${-activeSlide * (100 / featuredVideos.length)}% + ${dragOffsetPx}px))`,
                      transition: prefersReducedMotion || isDragging.current ? "none" : "transform 260ms ease-out",
                    }}
                  >
                    {featuredVideos.map((video, index) => (
                      <video
                        key={video.id}
                        ref={(node) => {
                          videoRefs.current[index] = node;
                        }}
                        className="h-full w-full shrink-0 object-cover"
                        style={{ objectPosition: video.objectPosition }}
                        controls={prefersReducedMotion}
                        loop={!prefersReducedMotion}
                        muted
                        playsInline
                        preload="metadata"
                        autoPlay={index === activeSlide && !prefersReducedMotion}
                        poster={video.poster}
                        aria-label={video.ariaLabel}
                      >
                        <source src={video.src} type="video/mp4" />
                      </video>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={goToPreviousSlide}
                    className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-zinc-100 backdrop-blur transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:flex"
                    aria-label="Previous featured video"
                  >
                    <span aria-hidden="true">←</span>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextSlide}
                    className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-zinc-100 backdrop-blur transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:flex"
                    aria-label="Next featured video"
                  >
                    <span aria-hidden="true">→</span>
                  </button>

                  <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-2 py-1 backdrop-blur md:flex">
                    {featuredVideos.map((video, index) => (
                      <button
                        key={`${video.id}-dot`}
                        type="button"
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 w-1.5 rounded-full transition ${index === activeSlide ? "bg-white" : "bg-white/45 hover:bg-white/70"}`}
                        aria-label={`Show featured video ${index + 1}`}
                        aria-current={index === activeSlide}
                      />
                    ))}
                  </div>
                </div>
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
