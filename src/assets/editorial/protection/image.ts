// Generated from a local photograph. Original metadata is not copied.
import jpeg480 from "./480.jpg";
import jpeg800 from "./800.jpg";
import jpeg1200 from "./1200.jpg";
import webp480 from "./480.webp";
import webp800 from "./800.webp";
import webp1200 from "./1200.webp";
import avif480 from "./480.avif";
import avif800 from "./800.avif";
import avif1200 from "./1200.avif";
export default {
  src: jpeg1200,
  alt: "Символическая композиция с домом и стеклянным щитом",
  width: 1200,
  height: 800,
  srcSet: [jpeg480 + " 480w", jpeg800 + " 800w", jpeg1200 + " 1200w"].join(
    ", ",
  ),
  sources: [
    {
      type: "image/avif",
      srcSet: [avif480 + " 480w", avif800 + " 800w", avif1200 + " 1200w"].join(
        ", ",
      ),
    },
    {
      type: "image/webp",
      srcSet: [webp480 + " 480w", webp800 + " 800w", webp1200 + " 1200w"].join(
        ", ",
      ),
    },
  ],
};
