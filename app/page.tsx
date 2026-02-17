'use client';

import { useMemo } from 'react';
import Gallery from "../components/Gallery";
import PricesList from "../components/PricesList";
import Reveal from "../components/Reveal";
import { getScheduleForDate } from "../lib/schedule";
import { SERVICES, getServiceLabel } from "../lib/services";
import { getShopStatus } from "../lib/status";
import { createDrukteWhatsappUrl } from "../lib/whatsapp";

const facts = [
  { label: "Jaren ervaring", value: "10+" },
  { label: "Gemiddelde review", value: "4.9/5" },
  { label: "Tevreden klanten", value: "4.000+" },
];

const dayLabels = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

export default function HomePage() {
  const status = useMemo(() => getShopStatus(new Date()), []);
  const selectedService = SERVICES[0];

  return (
    <main className="pb-20">
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Sener Barbershop</p>
        </Reveal>
        <Reveal delayMs={40}>
          <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.isOpen ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>
            {status.label}
          </span>
        </Reveal>
        <Reveal delayMs={60}>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Strakke cuts, consistente kwaliteit en een rustige barber ervaring.
          </h1>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="mt-5 max-w-2xl text-lg text-slate-700">
            Boek je afspraak online en stap binnen voor een look die past bij jouw stijl.
          </p>
        </Reveal>
        <Reveal delayMs={160} className="mt-6">
          <a
            href={createDrukteWhatsappUrl(getServiceLabel(selectedService))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 sm:w-auto"
          >
            Check drukte op WhatsApp
          </a>
        </Reveal>
        <Reveal delayMs={180} className="mt-4 flex flex-wrap gap-3">
          <a
            href="#prijzen"
            className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Bekijk prijzen
          </a>
          <a
            href="#gallery-heading"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
          >
            Bekijk gallery
          </a>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delayMs={index * 50}>
              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-3xl font-bold text-slate-900">{fact.value}</p>
                <p className="mt-1 text-sm text-slate-600">{fact.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-slate-900">Openingstijden</h2>
        <div className="mt-3 grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
          {dayLabels.map((label, dayIndex) => {
            const currentDate = new Date();
            const offset = dayIndex - currentDate.getDay();
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + offset);
            const daySchedule = getScheduleForDate(date);

            return (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="text-slate-600">
                  {daySchedule.closed ? "Gesloten" : `${daySchedule.open} - ${daySchedule.close}`}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <Gallery />
      <PricesList />
    </main>
  );
}
