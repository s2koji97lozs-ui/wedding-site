'use client';

import { useState } from 'react';
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { content } from "@/data/content";

// フェードイン付きImage
const FadeImage = ({ src, alt, sizes, priority = false }: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      onLoad={() => setIsLoaded(true)}
    />
  );
};

export const BestShots = () => {
  const { bestShots } = content;

  // Bento風レイアウト: インデックス0と3を大きく表示
  const isLargeCard = (index: number) => index === 0 || index === 3;

  return (
    <Section className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8 text-gray-900">
        {bestShots.heading}
      </h2>

      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {bestShots.images.map((img, i) => (
          <div
            key={i}
            className={`relative rounded-lg overflow-hidden bg-gray-100 ${isLargeCard(i) ? "col-span-2 aspect-[16/10]" : "aspect-square"
              }`}
            style={{ minHeight: isLargeCard(i) ? 200 : 120 }}
          >
            <FadeImage
              src={img.src}
              alt={img.alt}
              sizes={isLargeCard(i) ? "100vw" : "50vw"}
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    </Section>
  );
};
