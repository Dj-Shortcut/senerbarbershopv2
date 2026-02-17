import { describe, expect, it } from "vitest";
import { getStatus } from "./status";

describe("getStatus", () => {
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
    const status = getStatus(new Date(2026, 11, 25, 12, 0)); // Friday holiday
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten • opent morgen om 09:00");
  });
});
