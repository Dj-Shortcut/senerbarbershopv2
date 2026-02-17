'use client';

import { useMemo } from 'react';
import Gallery from "../components/Gallery";
import PricesList from "../components/PricesList";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";
import { getScheduleForDate } from "../lib/schedule";
import { SERVICES, getServiceLabel } from "../lib/services";
import { getShopStatus } from "../lib/status";
import { createDrukteWhatsappUrl } from "../lib/whatsapp";

const facts = [
  { label: "Zorgvuldige afwerking", value: "Elke knipbeurt" },
  { label: "Persoonlijke aanpak", value: "Op jouw stijl" },
  { label: "Walk-ins welkom", value: "Vandaag binnen" },
];

const dayLabels = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

export default function HomePage() {
  const status = useMemo(() => getShopStatus(new Date()), []);
  const selectedService = SERVICES[0];
  const today = new Date().getDay();

  return (
    <main className="pb-20">
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">The Sener Barber</p>
        </Reveal>
        <Reveal delayMs={40}>
          <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.isOpen ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30" : "bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700"}`}>
            {status.label}
          </span>
        </Reveal>
        <Reveal delayMs={60}>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            The Sener Barber
          </h1>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="mt-5 max-w-2xl text-lg text-zinc-300">
            Barbier in Ninove voor premium herensnitten, baardverzorging en een verzorgde look. Geen afspraak nodig, walk-ins zijn welkom.
          </p>
        </Reveal>
        <Reveal delayMs={160} className="mt-6">
          <a
            href={createDrukteWhatsappUrl(getServiceLabel(selectedService))}
            target="_blank"
            rel="noreferrer"
            aria-label="Check drukte via WhatsApp"
            className="ios-glass-pill ios-glass-pill--primary w-full sm:w-auto"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.88 19.88 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.88 19.88 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.48-1.23a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z"/></svg>
            <span>Check drukte op WhatsApp</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </Reveal>
        <Reveal delayMs={180} className="mt-4 flex flex-wrap gap-3">
          <a
            href="#prijzen"
            className="ios-glass-pill min-w-[11rem] flex-1 focus-visible:ring-emerald-300/70"
          >
            <span>Bekijk prijzen</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <a
            href="#gallery-heading"
            className="ios-glass-pill min-w-[11rem] flex-1 focus-visible:ring-emerald-300/70"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 7h4l2-2h6l2 2h4v12H3z"/><circle cx="12" cy="13" r="4"/></svg>
            <span>Bekijk galerij</span>
          </a>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delayMs={index * 50}>
              <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur">
                <p className="text-3xl font-bold text-zinc-50">{fact.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{fact.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-zinc-100">Openingstijden</h2>
            <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${status.isOpen ? "border-emerald-500/20 bg-emerald-500/15 text-emerald-200" : "border-white/15 bg-white/5 text-white/75"}`}>
              {status.isOpen ? "Open" : "Gesloten"}
            </span>
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 backdrop-blur">
            <div className="divide-y divide-white/10">
              {dayLabels.map((label, dayIndex) => {
                const currentDate = new Date();
                const offset = dayIndex - currentDate.getDay();
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() + offset);
                const daySchedule = getScheduleForDate(date);
                const isToday = dayIndex === today;

                return (
                  <div
                    key={label}
                    className={`grid grid-cols-[1fr_auto] items-center gap-4 py-3 text-sm ${isToday ? "-mx-2 rounded-lg bg-emerald-500/10 px-2" : ""}`}
                  >
                    <span className={`font-semibold ${isToday ? "text-emerald-200" : "text-white/90"}`}>{label}{isToday ? " (vandaag)" : ""}</span>
                    <span className="tabular-nums text-right text-white/85">
                      {daySchedule.closed ? <span className="font-medium text-zinc-300">Gesloten</span> : `${daySchedule.open} - ${daySchedule.close}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Gallery />
      <PricesList />
      <Footer />
    </main>
  );
}
