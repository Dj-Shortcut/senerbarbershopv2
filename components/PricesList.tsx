"use client";

import { useMemo, useState } from "react";
import { SERVICES } from "../lib/services";

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
            <article
              key={section.key}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_12px_30px_-22px_rgba(255,255,255,0.5)] backdrop-blur"
            >
              <h3 className="border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                {section.heading}
              </h3>

              <div className="divide-y divide-white/10">
                {section.itemIds.map((serviceId) => {
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
                      onClick={() => setSelectedService(service)}
                      className={`grid w-full gap-3 px-5 py-4 text-left transition sm:grid-cols-[1fr_auto] sm:items-center ${
                        isActive ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    >
                      <div>
                        <p className="text-base font-medium text-zinc-50">{service.name}</p>
                        <p className="mt-1 text-sm text-zinc-400">{description}</p>
                      </div>

                      <span className="inline-flex h-8 w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold tracking-wide text-zinc-100 sm:justify-self-end">
                        {service.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-4 text-xs text-zinc-500">Prijzen en beschikbaarheid kunnen variëren • Betaalopties ter plaatse</p>
      </div>
    </section>
  );
}
