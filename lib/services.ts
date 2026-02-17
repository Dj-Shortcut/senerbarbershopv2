export type Service = {
  id: string;
  name: string;
  price: string;
};

export const SERVICES: Service[] = [
  { id: "knippen", name: "Knippen", price: "€20" },
  { id: "knippen-baard", name: "Knippen & Baard", price: "€30" },
  { id: "tondeuse", name: "Alleen met tondeuse", price: "€15" },
  { id: "baard", name: "Baard scheren / trimmen", price: "€10" },
  { id: "wax", name: "Harsen van neus of oren (hete wax)", price: "€5" },
  { id: "haarwassen", name: "Haarwassen", price: "€5" },
  { id: "kinderen", name: "Kinderen tot 10 jaar", price: "€15" },
];

export function getServiceLabel(service: Service) {
  return `${service.name} (${service.price})`;
}
