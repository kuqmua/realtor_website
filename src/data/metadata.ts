import { site } from "./site.ts";
// Only confirmed biographical facts; no fictional office, ratings or offers.
export const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.profession,
  description: site.description,
  ...(site.approved ? { url: `${site.origin}/`, telephone: site.phone } : {}),
}).replaceAll("<", "\\u003c");
