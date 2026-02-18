import { describe, expect, it } from "vitest";
import { getLocalBusinessSchema } from "./localBusiness";

describe("getLocalBusinessSchema", () => {
  it("returns a schema graph with BarberShop and WebSite nodes", () => {
    const schema = getLocalBusinessSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(Array.isArray(schema["@graph"])).toBe(true);
    expect(schema["@graph"]).toHaveLength(2);

    const [barberShop, website] = schema["@graph"];

    expect(barberShop["@type"]).toBe("BarberShop");
    expect(barberShop.hasOfferCatalog).toBeDefined();
    expect(barberShop.hasOfferCatalog?.itemListElement.length).toBeGreaterThan(0);
    expect(barberShop.openingHoursSpecification).toHaveLength(5);

    expect(website["@type"]).toBe("WebSite");
    expect(website.publisher).toBeDefined();
    expect(website.publisher?.["@id"]).toBe(barberShop["@id"]);
  });

  it("exposes service offers with euro pricing", () => {
    const schema = getLocalBusinessSchema();
    const barberShop = schema["@graph"][0];
    expect(barberShop.hasOfferCatalog).toBeDefined();
    const offers = barberShop.hasOfferCatalog?.itemListElement ?? [];

    expect(offers.some((offer: { name: string }) => offer.name === "Knippen")).toBe(true);
    expect(offers.every((offer: { priceCurrency: string }) => offer.priceCurrency === "EUR")).toBe(true);
  });
});
