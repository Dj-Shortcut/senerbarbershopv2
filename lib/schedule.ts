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

export const OPENING_HOURS: Record<WeekDay, DailySchedule> = {
  monday: { open: "10:00", close: "19:00" },
  tuesday: { open: "10:00", close: "19:00" },
  wednesday: { open: "10:00", close: "19:00" },
  thursday: { open: "10:00", close: "20:00" },
  friday: { open: "10:00", close: "20:00" },
  saturday: { open: "09:00", close: "18:00" },
  sunday: { open: "00:00", close: "00:00", closed: true },
};

export const HOLIDAY_OVERRIDES: Record<string, DailySchedule> = {
  "2026-01-01": { open: "00:00", close: "00:00", closed: true },
  "2026-12-25": { open: "00:00", close: "00:00", closed: true },
  "2026-12-26": { open: "00:00", close: "00:00", closed: true },
};

const DAY_KEYS: WeekDay[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export function getScheduleForDate(date: Date) {
  const isoDate = date.toISOString().slice(0, 10);
  const holidayOverride = HOLIDAY_OVERRIDES[isoDate];
  if (holidayOverride) return holidayOverride;

  const day = DAY_KEYS[date.getDay()];
  return OPENING_HOURS[day];
}
