import { render, screen } from "@testing-library/react";
import PricesList from "./PricesList";

describe("PricesList", () => {
  it("renders heading and key services", () => {
    render(<PricesList />);

    expect(screen.getByRole("heading", { name: "Prijzen" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Knippen/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Knippen & Baard/i })).toBeInTheDocument();
  });

  it("shows default selected service summary", () => {
    render(<PricesList />);

    expect(screen.getByText(/Meest gekozen vandaag:/i)).toBeInTheDocument();
    expect(screen.getByText(/Knippen/i)).toBeInTheDocument();
  });
});
