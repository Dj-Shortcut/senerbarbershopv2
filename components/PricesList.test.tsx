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

  it("starts with no selected service summary", () => {
    render(<PricesList />);

    const ui = getPricesSection();

    expect(ui.getByText(/Meest gekozen vandaag:/i)).toBeInTheDocument();
    expect(ui.getByText(/Kies een behandeling/i)).toBeInTheDocument();
  });


  it("keeps all price items inactive on initial render", () => {
    render(<PricesList />);

    const ui = getPricesSection();
    const pressedItems = ui.queryAllByRole("button", { pressed: true });

    expect(pressedItems).toHaveLength(0);
  });

  it("renders fallback message when no services are available", () => {
    render(<PricesList services={[]} />);

    const ui = getPricesSection();

    expect(ui.getByText(/prijslijst wordt momenteel bijgewerkt/i)).toBeInTheDocument();
  });
});
