import { getScheduleForDate } from "./schedule";

export type BusyLevel = "Rustig" | "Normaal" | "Druk";

const DAY_LABELS = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"] as const;

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatBelgianTime(hoursMinutes: string) {
  const [hours, minutes] = hoursMinutes.split(":").map(Number);
  const date = new Date(2026, 0, 1, hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatRemainingMinutes(totalMinutes: number) {
  if (totalMinutes <= 0) {
    return "0m";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}u`;
  }

  return `${hours}u ${minutes}m`;
}

function getNextOpening(now: Date) {
  for (let dayOffset = 0; dayOffset <= 7; dayOffset += 1) {
    const candidate = new Date(now);
    candidate.setDate(now.getDate() + dayOffset);

    const schedule = getScheduleForDate(candidate);
    if (schedule.closed) {
      continue;
    }

    const openingMinutes = toMinutes(schedule.open);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (dayOffset === 0 && currentMinutes < openingMinutes) {
      return { date: candidate, open: schedule.open, dayOffset };
    }

    if (dayOffset > 0) {
      return { date: candidate, open: schedule.open, dayOffset };
    }
  }

  return null;
}

function getNextOpeningLabel(now: Date, dayOffset: number) {
  if (dayOffset === 0) {
    return "vandaag";
  }

  if (dayOffset === 1) {
    return "morgen";
  }

  const targetDay = (now.getDay() + dayOffset) % 7;
  return DAY_LABELS[targetDay];
}

export function getStatus(now = new Date()) {
  const schedule = getScheduleForDate(now);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (!schedule.closed) {
    const openMinutes = toMinutes(schedule.open);
    const closeMinutes = toMinutes(schedule.close);
    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    if (isOpen) {
      const busyLevel: BusyLevel =
        currentMinutes >= 16 * 60 ? "Druk" : currentMinutes >= 13 * 60 ? "Normaal" : "Rustig";
      const minutesUntilClose = closeMinutes - currentMinutes;
      const closeTimeText = formatBelgianTime(schedule.close);
      const closesInText = formatRemainingMinutes(minutesUntilClose);

      return {
        isOpen: true,
        busyLevel,
        label: `Open • sluit om ${closeTimeText} (over ${closesInText})`,
      };
    }
  }

  const nextOpening = getNextOpening(now);
  if (!nextOpening) {
    return { isOpen: false, busyLevel: "Rustig" as BusyLevel, label: "Gesloten" };
  }

  const dayLabel = getNextOpeningLabel(now, nextOpening.dayOffset);
  return {
    isOpen: false,
    busyLevel: "Rustig" as BusyLevel,
    label: `Gesloten • opent ${dayLabel} om ${formatBelgianTime(nextOpening.open)}`,
  };
}

export const getShopStatus = getStatus;
