'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { content, GuestImage } from '@/data/content';

type Orientation = 'portrait' | 'landscape' | 'square';

// 各カードが自分のorientationを管理
const GuestCard = ({ img, priority }: { img: GuestImage; priority: boolean }) => {
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => {
      const ratio = image.naturalWidth / image.naturalHeight;
      let newOrientation: Orientation = 'portrait';
      if (ratio > 1.2) {
        newOrientation = 'landscape';
      } else if (ratio < 0.8) {
        newOrientation = 'portrait';
      } else {
        newOrientation = 'square';
      }
      setOrientation(newOrientation);
    };
    image.src = img.src;
  }, [img.src]);

  // 高さ統一アプローチ: 高さを固定し、横長画像は幅を広げる
  // 基準: 縦長カード 280px幅 × 373px高さ (3:4)
  // モバイル: 高さを70vwに固定
  // landscape: 幅 = 70vw * 16/10 = 112vw → 88vwに制限
  // portrait: 幅 = 70vw * 3/4 = 52.5vw
  // square: 幅 = 70vw
  const getCardDimensions = () => {
    const heightMobile = 70; // vw
    const heightDesktop = 450; // px

    switch (orientation) {
      case 'landscape':
        return {
          width: `min(88vw, ${heightDesktop * 16 / 10}px)`,
          height: `min(${heightMobile}vw, ${heightDesktop}px)`,
        };
      case 'square':
        return {
          width: `min(${heightMobile}vw, ${heightDesktop}px)`,
          height: `min(${heightMobile}vw, ${heightDesktop}px)`,
        };
      default: // portrait
        return {
          width: `min(${heightMobile * 3 / 4}vw, ${heightDesktop * 3 / 4}px)`,
          height: `min(${heightMobile}vw, ${heightDesktop}px)`,
        };
    }
  };

  const dimensions = getCardDimensions();

  return (
    <div
      className="scroll-item flex-none relative rounded-xl overflow-hidden snap-center bg-gray-100"
      style={{
        scrollSnapStop: 'always',
        width: dimensions.width,
        height: dimensions.height,
      }}
      data-orientation={orientation}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 768px) 88vw, 720px"
        priority={priority}
        className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
      {/* 撮影者名とコメントのオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
        <p className="text-white text-sm font-semibold mb-1">{img.photographer}</p>
        <p className="text-white/90 text-xs leading-relaxed">{img.comment}</p>
      </div>
    </div>
  );
};

export const GuestHighlights = () => {
  const { guestHighlights } = content;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <Reveal className="px-6 max-w-5xl mx-auto mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{guestHighlights.heading}</h2>
        <p className="text-gray-500 mt-2">{guestHighlights.description}</p>
      </Reveal>

      {/* Horizontal Scroll Container */}
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
          <GuestCard key={i} img={img} priority={i < 2} />
        ))}
      </div>
    </section>
  );
};
