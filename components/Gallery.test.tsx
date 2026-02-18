import { render, screen, within } from "@testing-library/react";
import Gallery from "./Gallery";

describe("Gallery", () => {
  it("renders fallback copy when gallery items are empty", () => {
    render(<Gallery items={[]} />);

    const section = screen.getByRole("region", { name: /recente looks/i });
    const ui = within(section);

    expect(ui.getByText(/Nieuwe looks worden binnenkort toegevoegd/i)).toBeInTheDocument();
  });

  it("renders provided gallery items", () => {
    render(
      <Gallery
        items={[
          {
            id: "test-item",
            title: "Test Look",
            altText: "Test alt beschrijving",
            imageSrc: "/assets/images/classic-cut.jpg",
            aspect: "portrait",
          },
        ]}
      />,
    );

    expect(screen.getByText("Test Look")).toBeInTheDocument();
    expect(screen.getByAltText("Test alt beschrijving")).toBeInTheDocument();
  });
});
