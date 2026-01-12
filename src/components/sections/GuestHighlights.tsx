'use client';

import { useState } from 'react';
import Image from 'next/image';
import { content } from '@/data/content';

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

export const GuestHighlights = () => {
  const { guestHighlights } = content;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="px-6 max-w-5xl mx-auto mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{guestHighlights.heading}</h2>
        <p className="text-gray-500 mt-2">{guestHighlights.description}</p>
      </div>

      {/* Horizontal Scroll Container - ユーザー操作優先 */}
      <div
        className="flex overflow-x-auto pb-6 gap-3 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          scrollPaddingLeft: '1.5rem',
          scrollPaddingRight: '1.5rem',
        }}
      >
        {guestHighlights.images.map((img, i) => (
          <div
            key={i}
            className="scroll-item flex-none w-[85vw] md:w-[400px] aspect-[3/4] relative rounded-xl overflow-hidden snap-center bg-gray-100"
            style={{ scrollSnapStop: 'always' }}
          >
            <FadeImage
              src={img.src}
              alt={img.alt}
              sizes="(max-width: 768px) 85vw, 400px"
              priority={i < 2}
            />
            {/* 撮影者名とコメントのオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
              <p className="text-white text-sm font-semibold mb-1">{img.photographer}</p>
              <p className="text-white/90 text-xs leading-relaxed">{img.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
