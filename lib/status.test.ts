import { afterEach, describe, expect, it, vi } from "vitest";
import { getStatus } from "./status";

describe("getStatus", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns next opening today before opening time", () => {
    const status = getStatus(new Date(2026, 0, 6, 9, 59)); // Tuesday
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent vandaag om 10:00");
  });

  it("returns open copy at exact opening time", () => {
    const status = getStatus(new Date(2026, 0, 6, 10, 0));
    expect(status.isOpen).toBe(true);
    expect(status.busyLevel).toBe("Rustig");
    expect(status.label).toBe("Open • sluit om 19:00 (over 9u)");
  });

  it("returns next opening tomorrow at exact closing time", () => {
    const status = getStatus(new Date(2026, 0, 6, 19, 0));
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent morgen om 10:00");
  });

  it("returns next opening day label after saturday close", () => {
    const status = getStatus(new Date(2026, 0, 10, 18, 15)); // Saturday after close
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent dinsdag om 10:00");
  });

  it("returns next opening around configured holiday", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-12-25T12:00:00+01:00")); // Friday holiday in Europe/Brussels

    const status = getStatus();
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent morgen om 09:00");
  });
});
