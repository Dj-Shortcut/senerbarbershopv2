import { describe, expect, it } from "vitest";
import { getStatus } from "./status";

describe("getStatus", () => {
  it("returns closed before opening time", () => {
    const status = getStatus(new Date(2026, 0, 6, 9, 59)); // Tuesday
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten");
  });

  it("returns open at exact opening time", () => {
    const status = getStatus(new Date(2026, 0, 6, 10, 0));
    expect(status.isOpen).toBe(true);
    expect(status.busyLevel).toBe("Rustig");
  });

  it("returns closed at exact closing time", () => {
    const status = getStatus(new Date(2026, 0, 6, 19, 0));
    expect(status.isOpen).toBe(false);
  });

  it("returns closed on configured holiday", () => {
    const status = getStatus(new Date(2026, 11, 25, 12, 0));
    expect(status.isOpen).toBe(false);
    expect(status.label).toBe("Gesloten");
  });
});
