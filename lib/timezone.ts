const belgianDateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Brussels",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function getPart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  const part = parts.find((value) => value.type === type);
  if (!part) {
    throw new Error(`Missing ${type} date part`);
  }

  return Number.parseInt(part.value, 10);
}

export function getBelgianWallClockDate(referenceDate = new Date()) {
  const parts = belgianDateTimeFormatter.formatToParts(referenceDate);
  const year = getPart(parts, "year");
  const month = getPart(parts, "month");
  const day = getPart(parts, "day");
  const hour = getPart(parts, "hour");
  const minute = getPart(parts, "minute");
  const second = getPart(parts, "second");

  return new Date(year, month - 1, day, hour, minute, second);
}
