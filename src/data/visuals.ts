import heroSkyline from "../assets/editorial/hero-skyline/image";
import contactsDoorway from "../assets/editorial/contacts-doorway/image";
import termsAgreement from "../assets/editorial/terms-agreement/image";
import coverageCity from "../assets/editorial/coverage-city/image";
import audienceInterior from "../assets/editorial/audience-interior/image";
import aboutWorkspace from "../assets/editorial/about-workspace/image";
import heroResidence from "../assets/editorial/hero-residence/image";
import architecture from "../assets/editorial/architecture/image";
import mortgage from "../assets/editorial/mortgage/image";
import protection from "../assets/editorial/protection/image";
import type { PropertyImage } from "../types/content";

export const illustrations = {
  heroSkyline,
  architecture,
  mortgage,
  protection,
  heroResidence,
  aboutWorkspace,
  audienceInterior,
  coverageCity,
  termsAgreement,
  contactsDoorway,
};
export const serviceVisuals: Record<string, PropertyImage> = {
  purchase: architecture,
  mortgage,
  insurance: protection,
};
