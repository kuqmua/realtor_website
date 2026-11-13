// Generated from a local photograph. Original metadata is not copied.
import jpeg480 from "./480.jpg";
import jpeg800 from "./800.jpg";
import jpeg1024 from "./1024.jpg";
import webp480 from "./480.webp";
import webp800 from "./800.webp";
import webp1024 from "./1024.webp";
import avif480 from "./480.avif";
import avif800 from "./800.avif";
import avif1024 from "./1024.avif";
export default {
  src: jpeg1024,
  alt: "Елена Сергеевна Левошина — частный риелтор",
  width: 1024,
  height: 1536,
  srcSet: [jpeg480 + " 480w", jpeg800 + " 800w", jpeg1024 + " 1024w"].join(
    ", ",
  ),
  sources: [
    {
      type: "image/avif",
      srcSet: [avif480 + " 480w", avif800 + " 800w", avif1024 + " 1024w"].join(
        ", ",
      ),
    },
    {
      type: "image/webp",
      srcSet: [webp480 + " 480w", webp800 + " 800w", webp1024 + " 1024w"].join(
        ", ",
      ),
    },
  ],
};
