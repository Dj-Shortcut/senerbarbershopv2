"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { SERVICES, type Service } from "../lib/services";

const sectionDefinitions = [
  {
    key: "knippen",
    heading: "Knippen",
    itemIds: ["knippen", "tondeuse", "haarwassen"],
    descriptions: {
      knippen: "Signature snit met persoonlijke styling.",
      tondeuse: "Strakke all-over tondeusebeurt.",
      haarwassen: "Verfrissende wasbeurt als extra service.",
    },
  },
  {
    key: "baard",
    heading: "Baard",
    itemIds: ["baard", "wax"],
    descriptions: {
      baard: "Contouren en verzorgde afwerking.",
      wax: "Neus of oren met zachte hete wax.",
    },
  },
  {
    key: "combo",
    heading: "Combo",
    itemIds: ["knippen-baard"],
    descriptions: {
      "knippen-baard": "Volledige grooming in één sessie.",
    },
  },
  {
    key: "kids",
    heading: "Kids",
    itemIds: ["kinderen"],
    descriptions: {
      kinderen: "Voor kinderen tot 10 jaar.",
    },
  },
] as const;

type SectionDefinition = (typeof sectionDefinitions)[number];

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function PriceSectionCard({
  section,
  selectedService,
  onSelect,
  servicesById,
}: {
  section: SectionDefinition;
  selectedService: Service;
  onSelect: (service: Service) => void;
  servicesById: Map<string, Service>;
}) {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`price-section-card reveal overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_12px_30px_-22px_rgba(255,255,255,0.5)] backdrop-blur ${
        isVisible ? "reveal--visible" : ""
      }`.trim()}
    >
      <h3 className="border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">{section.heading}</h3>

      <div className="divide-y divide-white/10">
        {section.itemIds.map((serviceId, index) => {
          const service = servicesById.get(serviceId);
          if (!service) {
            return null;
          }

          const isActive = service.id === selectedService.id;
          const description = section.descriptions[service.id as keyof typeof section.descriptions];

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(service)}
              data-active={isActive ? "true" : "false"}
              className="price-row grid w-full gap-3 px-5 py-4 text-left transition sm:grid-cols-[1fr_auto] sm:items-center"
              style={{ "--stagger": `${index * 60}ms` } as CSSProperties}
            >
              <div>
                <p className="price-row__title text-base font-medium text-zinc-50">{service.name}</p>
                <p className="mt-1 text-sm text-zinc-400">{description}</p>
              </div>

              <span className="price-badge inline-flex h-8 w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold tracking-wide text-zinc-100 sm:justify-self-end">
                {service.price}
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default function PricesList() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const servicesById = useMemo(() => new Map(SERVICES.map((service) => [service.id, service])), []);

  return (
    <section id="prijzen" className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">Prijzen</h2>
        <p className="mt-2 text-sm text-zinc-400">Meest gekozen vandaag: {selectedService.name}</p>

        <div className="mt-6 space-y-5">
          {sectionDefinitions.map((section) => (
            <PriceSectionCard
              key={section.key}
              section={section}
              selectedService={selectedService}
              onSelect={setSelectedService}
              servicesById={servicesById}
            />
          ))}
        </div>

        <p className="mt-4 text-xs text-zinc-500">Prijzen en beschikbaarheid kunnen variëren • Betaalopties ter plaatse</p>
      </div>
    </section>
  );
}
