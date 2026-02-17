import { getScheduleForDate } from "./schedule";

export type BusyLevel = "Rustig" | "Normaal" | "Druk";

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getShopStatus(now = new Date()) {
  const schedule = getScheduleForDate(now);
  if (schedule.closed) {
    return { isOpen: false, busyLevel: "Rustig" as BusyLevel, label: "Gesloten" };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = toMinutes(schedule.open);
  const closeMinutes = toMinutes(schedule.close);
  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (!isOpen) {
    return { isOpen: false, busyLevel: "Rustig" as BusyLevel, label: "Gesloten" };
  }

  const busyLevel: BusyLevel =
    currentMinutes >= 16 * 60 ? "Druk" : currentMinutes >= 13 * 60 ? "Normaal" : "Rustig";

  return { isOpen: true, busyLevel, label: `Open • ${busyLevel}` };
}
