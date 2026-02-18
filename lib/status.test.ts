import { afterEach, describe, expect, it, vi } from "vitest";
import { getStatus } from "./status";

function atBrussels(isoWithOffset: string) {
  return new Date(isoWithOffset);
}

describe("getStatus", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns next opening today before opening time", () => {
    const status = getStatus(new Date(2026, 0, 6, 8, 59)); // Tuesday
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent vandaag om 09:00");
  });

  it("returns open copy at exact opening time", () => {
    const status = getStatus(new Date(2026, 0, 6, 9, 0));
    expect(status.isOpen).toBe(true);
    expect(status.busyLevel).toBe("Rustig");
    expect(status.label).toBe("Open • sluit om 19:00 (over 10u)");
  });

  it("returns next opening tomorrow at exact closing time", () => {
    const status = getStatus(new Date(2026, 0, 6, 19, 0));
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent morgen om 09:00");
  });

  it("returns next opening day label after saturday close", () => {
    const status = getStatus(new Date(2026, 0, 10, 18, 15)); // Saturday after close
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent dinsdag om 09:00");
  });

  it("returns closed during configured holiday and points to next regular opening day", () => {
    const status = getStatus(atBrussels("2026-01-01T12:00:00+01:00")); // Thursday holiday
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent morgen om 09:00");
  });

  it("stays open one minute before thursday closing time", () => {
    const status = getStatus(atBrussels("2026-01-08T19:59:00+01:00")); // Thursday
    expect(status.isOpen).toBe(true);
    expect(status.busyLevel).toBe("Druk");
    expect(status.label).toBe("Open • sluit om 20:00 (over 1m)");
  });

  it("switches to closed exactly at thursday closing time", () => {
    const status = getStatus(atBrussels("2026-01-08T20:00:00+01:00")); // Thursday
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent morgen om 09:00");
  });

  it("labels next opening day correctly over multiple consecutive closed days", () => {
    const status = getStatus(atBrussels("2026-12-26T12:00:00+01:00")); // Saturday holiday
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent dinsdag om 09:00");
  });

  it("returns next opening from a fixed mocked clock", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-17T08:00:00.000+01:00")); // Tuesday before opening in Europe/Brussels

    const status = getStatus();
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent vandaag om 09:00");
  });
});
