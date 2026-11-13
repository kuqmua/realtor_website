import type { PropertyImage } from "../types/content";
import { ResponsiveImage } from "./ResponsiveImage";

export function SectionBackground({ image }: { image: PropertyImage }) {
  return (
    <div className="section-background" aria-hidden="true">
      <ResponsiveImage image={{ ...image, alt: "" }} sizes="100vw" />
    </div>
  );
}
