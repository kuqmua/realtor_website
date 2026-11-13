import type { PropertyImage } from "../types/content";
interface Props {
  image: PropertyImage;
  sizes: string;
  className?: string;
  priority?: boolean;
}
export function ResponsiveImage({
  image,
  sizes,
  className,
  priority = false,
}: Props) {
  return (
    <picture>
      {image.sources?.map((source) => (
        <source
          key={source.type}
          type={source.type}
          srcSet={source.srcSet}
          sizes={sizes}
        />
      ))}
      <img
        className={className}
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.srcSet ? sizes : undefined}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
