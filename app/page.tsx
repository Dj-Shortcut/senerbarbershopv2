"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Camera, Phone } from "lucide-react";
import Gallery from "../components/Gallery";
import PricesList from "../components/PricesList";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";
import { getScheduleForDate } from "../lib/schedule";
import { SERVICES, getServiceLabel } from "../lib/services";
import { getShopStatus } from "../lib/status";
import { createDrukteWhatsAppUrl } from "../lib/whatsapp";
import { vacationEnabled, vacationReturnDate } from "../lib/config";

const facts = [
  { label: "Afwerking", value: "Strakke contouren" },
  { label: "Aanpak", value: "Op jouw stijl" },
  { label: "Binnenlopen", value: "Walk-ins welkom" },
];

const dayLabels = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

function formatHourRange(hour: string) {
  return hour.replace(":00", "u");
}

export default function HomePage() {
  const [now, setNow] = useState<Date | null>(null);
  const referenceDate = now ?? new Date("2026-01-01T12:00:00");
  const status = getShopStatus(referenceDate);
  const selectedService = SERVICES[0];
  const today = referenceDate.getDay();
  const heroRef = useRef<HTMLElement | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    setNow(new Date());

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
    <main id="main-content" className={`pb-20 ${showStickyCta ? "pb-[calc(7.25rem+env(safe-area-inset-bottom))] sm:pb-20" : ""}`}>
      <section ref={heroRef} className="hero-stage relative isolate flex min-h-[92svh] w-full items-end overflow-hidden px-4 pb-10 pt-16 sm:min-h-[86svh] sm:px-6 sm:pb-14 lg:px-8">
        <Image
          src="/assets/images/signature-fade.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-stage__image object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.92)_0%,rgba(9,9,11,0.76)_42%,rgba(9,9,11,0.3)_72%,rgba(9,9,11,0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-sm font-semibold uppercase text-zinc-300">The Sener Barber</p>
            </Reveal>
            <Reveal delayMs={40}>
              <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${status.isVacation ? "bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/30" : status.isOpen ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30" : "bg-black/45 text-zinc-200 ring-1 ring-white/15"}`}>
                {status.label}
              </span>
            </Reveal>
            {vacationEnabled ? (
              <Reveal delayMs={55}>
                <div className="vacation-banner mt-4" data-visible="true" role="status" aria-live="polite">
                  We zijn gesloten wegens vakantie en zijn terug open op {vacationReturnDate}
                </div>
              </Reveal>
            ) : null}
            <Reveal delayMs={70}>
              <h1 className="mt-5 text-5xl font-bold leading-[0.98] text-zinc-50 sm:text-6xl lg:text-7xl">
                The Sener Barber
              </h1>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-200 sm:text-lg">
                Barbier in Ninove voor strakke fades, baardverzorging en een verzorgde look. Kom langs wanneer het past.
              </p>
            </Reveal>
            <Reveal delayMs={160} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={createDrukteWhatsAppUrl(getServiceLabel(selectedService))}
                target="_blank"
                rel="noreferrer"
                aria-label="Check drukte via WhatsApp"
                className="ios-glass-pill ios-glass-pill--primary w-full sm:w-auto"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Check drukte op WhatsApp</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#prijzen" className="ios-glass-pill w-full sm:w-auto">
                <span>Bekijk prijzen</span>
              </a>
            </Reveal>
          </div>

          <Reveal delayMs={220} className="hero-proof w-full lg:max-w-sm">
            <div className="grid gap-3 border-t border-white/20 pt-4 sm:grid-cols-3 lg:grid-cols-1">
              {facts.map((fact) => (
                <div key={fact.label} className="grid gap-1">
                  <p className="text-xs uppercase text-zinc-400">{fact.label}</p>
                  <p className="text-base font-semibold text-zinc-100">{fact.value}</p>
                </div>
              ))}
              <a
                href="#gallery-heading"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:col-span-3 lg:col-span-1"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                <span>Bekijk recente looks</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-7">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="flex flex-col justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-zinc-500">Vandaag</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-100">Openingstijden</h2>
            </div>
            <span className={`w-fit rounded-full border px-2.5 py-1 text-xs font-medium ${status.isVacation ? "border-amber-500/30 bg-amber-500/15 text-amber-100" : status.isOpen ? "border-emerald-500/20 bg-emerald-500/15 text-emerald-200" : "border-white/15 bg-white/5 text-white/75"}`}>
              {status.badgeLabel}
            </span>
          </div>
          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {dayLabels.map((label, dayIndex) => {
              const offset = dayIndex - referenceDate.getDay();
              const date = new Date(referenceDate);
              date.setDate(referenceDate.getDate() + offset);
              const daySchedule = getScheduleForDate(date);
              const isToday = dayIndex === today;

              return (
                <div
                  key={label}
                  className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/10 py-3 text-sm ${isToday ? "border-emerald-400/40 text-emerald-100" : ""}`}
                >
                  <span className={`font-semibold ${dayIndex === 1 && !isToday ? "text-zinc-500" : "text-white/90"}`}>
                    {label}
                    {isToday ? " (vandaag)" : ""}
                  </span>
                  <span className={`tabular-nums text-right ${dayIndex === 1 && !isToday ? "text-zinc-500" : "text-white/85"}`}>
                    {daySchedule.closed ? (
                      <span className={`font-medium ${dayIndex === 1 && !isToday ? "text-zinc-500" : "text-zinc-300"}`}>{dayIndex === 1 ? "Gesloten (rustdag)" : "Gesloten"}</span>
                    ) : (
                      `${formatHourRange(daySchedule.open)}-${formatHourRange(daySchedule.close)}`
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Gallery />
      <PricesList />
      <Footer />

      <div className="sticky-mobile-cta sm:hidden" data-visible={showStickyCta ? "true" : "false"}>
        <a
          href={createDrukteWhatsAppUrl(getServiceLabel(selectedService))}
          target="_blank"
          rel="noreferrer"
          aria-label="Check drukte via WhatsApp"
          className="ios-glass-pill ios-glass-pill--primary"
        >
          Check drukte
        </a>
        <a href="#prijzen" className="ios-glass-pill">
          Prijzen
        </a>
      </div>
    </main>
  );
}
