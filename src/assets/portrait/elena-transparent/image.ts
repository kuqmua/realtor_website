import png480 from "./480.png";
import png800 from "./800.png";
import png1024 from "./1024.png";
import webp480 from "./480.webp";
import webp800 from "./800.webp";
import webp1024 from "./1024.webp";
import avif480 from "./480.avif";
import avif800 from "./800.avif";
import avif1024 from "./1024.avif";
export default {
  src: png1024,
  alt: "Елена Сергеевна Левошина — частный риелтор",
  width: 1024,
  height: 1536,
  srcSet: [png480 + " 480w", png800 + " 800w", png1024 + " 1024w"].join(", "),
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
