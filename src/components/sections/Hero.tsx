import Image from 'next/image';
import { content } from '@/data/content';

export const Hero = () => {
  const { hero } = content;
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.bgImage.src}
          alt={hero.bgImage.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 drop-shadow-lg">
          {hero.title}
        </h1>
        <p className="text-lg md:text-xl font-light tracking-widest uppercase opacity-90">
          {hero.subTitle}
        </p>
      </div>
    </div>
  );
};
