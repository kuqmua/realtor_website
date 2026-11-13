export interface PropertyImage {
  src: string;
  alt: string;
  srcSet?: string;
  sources?: { type: string; srcSet: string }[];
  width: number;
  height: number;
}
export interface Property {
  id: string;
  published: boolean;
  demo?: boolean;
  title: string;
  kind: "apartment" | "house" | "land" | "commercial";
  locality: string;
  address?: string;
  priceRub: number;
  areaM2: number;
  rooms?: number;
  floor?: number;
  floorsTotal?: number;
  landAreaM2?: number;
  purpose?: string;
  description: string;
  images: PropertyImage[];
}
