import { render, within } from "@testing-library/react";
import PricesList from "./PricesList";

function getPricesSection() {
  const section = document.querySelector("#prijzen");
  expect(section).toBeTruthy();
  return within(section as HTMLElement);
}

describe("PricesList", () => {
  it("renders heading and key services", () => {
    render(<PricesList />);

    const ui = getPricesSection();

    expect(ui.getByRole("heading", { name: "Prijzen" })).toBeInTheDocument();
    expect(ui.getAllByRole("button", { name: /knippen/i }).length).toBeGreaterThan(0);
    expect(ui.getByRole("button", { name: /knippen & baard/i })).toBeInTheDocument();
  });

  it("shows default selected service summary", () => {
    render(<PricesList />);

    const ui = getPricesSection();

    expect(ui.getByText(/Meest gekozen vandaag:/i)).toBeInTheDocument();
    expect(ui.getAllByText(/knippen/i).length).toBeGreaterThan(0);
  });
});
