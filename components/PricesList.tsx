"use client";

import { useMemo, useState } from "react";
import { SERVICES, getServiceLabel } from "../lib/services";
import { premiumButtonClassName } from "../lib/ui";
import { createDrukteMessage, createDrukteWhatsappUrl } from "../lib/whatsapp";

export default function PricesList() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);

  const whatsappMessage = useMemo(() => createDrukteMessage(getServiceLabel(selectedService)), [selectedService]);

  return (
    <section id="prijzen" className="py-8">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">Prijzen</h2>
        <p className="mt-2 text-sm text-zinc-400">Populaire keuze: {selectedService.name}</p>

        <article className="mt-6 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-sm shadow-black/20 backdrop-blur">
          <div className="divide-y divide-zinc-800">
            {SERVICES.map((service) => {
              const isActive = service.id === selectedService.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition ${
                    isActive ? "bg-zinc-800/80" : "hover:bg-zinc-800/60"
                  }`}
                >
                  <p className="font-medium text-zinc-200">{service.name}</p>
                  <p className="shrink-0 text-zinc-100">{service.price}</p>
                </button>
              );
            })}
          </div>
        </article>

        <a
          href={createDrukteWhatsappUrl(getServiceLabel(selectedService))}
          target="_blank"
          rel="noreferrer"
          className={`${premiumButtonClassName} mt-4`}
        >
          Check drukte via WhatsApp
        </a>
        <p className="mt-2 text-xs text-zinc-500">Template preview: {whatsappMessage}</p>
      </div>
    </section>
  );
}
