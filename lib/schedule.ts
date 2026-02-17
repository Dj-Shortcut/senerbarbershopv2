import { CLOSE_HOUR, HOLIDAYS_BY_YEAR, OPEN_DAYS, OPEN_HOUR } from "./config";

export type WeekDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type DailySchedule = {
  open: string;
  close: string;
  closed?: boolean;
};

const DAY_KEYS: WeekDay[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const CLOSED_DAY: DailySchedule = { open: "00:00", close: "00:00", closed: true };

function toLocalIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isHoliday(date: Date) {
  const year = date.getFullYear();
  const monthDay = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return HOLIDAYS_BY_YEAR[year]?.includes(monthDay) ?? false;
}

export function getScheduleForDate(date: Date): DailySchedule {
  if (isHoliday(date)) {
    return CLOSED_DAY;
  }

  const day = DAY_KEYS[date.getDay()];
  if (!OPEN_DAYS.includes(day as (typeof OPEN_DAYS)[number])) {
    return CLOSED_DAY;
  }

  return {
    open: OPEN_HOUR[day as keyof typeof OPEN_HOUR],
    close: CLOSE_HOUR[day as keyof typeof CLOSE_HOUR],
  };
}

export { toLocalIsoDate };
