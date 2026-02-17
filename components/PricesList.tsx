"use client";

import { useState } from "react";
import { SERVICES } from "../lib/services";

export default function PricesList() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);

  return (
    <section id="prijzen" className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Prijzen</h2>
        <p className="mt-2 text-sm text-slate-600">Populaire keuze: {selectedService.name}</p>

        <article className="mt-6 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-sm shadow-black/20 backdrop-blur">
          <div className="divide-y divide-zinc-800">
            {SERVICES.map((service) => {
              const isActive = service.id === selectedService.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={`flex w-full flex-col items-start gap-2 px-4 py-4 text-left transition sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 lg:min-h-20 lg:px-6 xl:min-h-24 ${
                    isActive ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}
                >
                  <p className="w-full text-base font-medium leading-6 text-slate-800 lg:max-w-[75%] xl:max-w-[80%]">{service.name}</p>
                  <p className="w-full text-base font-semibold text-slate-900 sm:w-auto sm:shrink-0">{service.price}</p>
                </button>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
