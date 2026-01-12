'use client';

import { useState } from 'react';
import Image from 'next/image';
import { content } from '@/data/content';

export const Hero = () => {
  const { hero } = content;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.bgImage.src}
          alt={hero.bgImage.alt}
          fill
          className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          priority
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 drop-shadow-lg">
          {hero.title}
        </h1>
        <p className="text-sm md:text-lg font-light tracking-[0.2em] uppercase opacity-90 whitespace-nowrap">
          {hero.subTitle}
        </p>
      </div>
    </div>
  );
};
