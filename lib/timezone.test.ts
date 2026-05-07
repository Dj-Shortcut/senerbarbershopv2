import { describe, expect, it } from "vitest";

import { getBelgianWallClockDate } from "./timezone";

describe("getBelgianWallClockDate", () => {
  it("maps UTC instants to Brussels local clock during winter", () => {
    const utcDate = new Date("2026-01-15T12:30:00.000Z");
    const belgianClockDate = getBelgianWallClockDate(utcDate);

    expect(belgianClockDate.getHours()).toBe(13);
    expect(belgianClockDate.getDate()).toBe(15);
  });

  it("maps UTC instants to Brussels local clock during summer", () => {
    const utcDate = new Date("2026-07-15T12:30:00.000Z");
    const belgianClockDate = getBelgianWallClockDate(utcDate);

    expect(belgianClockDate.getHours()).toBe(14);
    expect(belgianClockDate.getDate()).toBe(15);
  });

  it("maps UTC instants near midnight to the Brussels calendar day", () => {
    const utcDate = new Date("2026-07-15T22:30:00.000Z");
    const belgianClockDate = getBelgianWallClockDate(utcDate);

    expect(belgianClockDate.getHours()).toBe(0);
    expect(belgianClockDate.getDate()).toBe(16);
    expect(belgianClockDate.getDay()).toBe(4);
  });
});
