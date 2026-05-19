import Image from 'next/image';

/**
 * Top hero on /journal — single large static image. Replace the image to
 * change the front-of-page mood. No animation by user request.
 */
interface Props {
  src: string;
  alt: string;
}

export default function HeroImage({ src, alt }: Props) {
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#2a2e2c]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 1100px"
        className="object-cover"
      />
    </div>
  );
}
