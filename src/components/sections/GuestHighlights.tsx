'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { content } from '@/data/content';

export const GuestHighlights = () => {
  const { guestHighlights } = content;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // シームレスなループのために、最初のアイテムの幅を取得
    const firstItem = container.querySelector('.scroll-item') as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth + 12; // カード幅 + gap (gap-3 = 12px)
    const singleSetWidth = itemWidth * guestHighlights.images.length;
    const scrollSpeed = 0.3; // スクロール速度を下げて邪魔にならないように
    let scrollPosition = 0;
    let isPaused = false;

    const autoScroll = () => {
      if (container && !isPaused) {
        scrollPosition += scrollSpeed;

        // 元のセット分の幅に達したら、位置をリセット（シームレスにループ）
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = scrollPosition - singleSetWidth;
        }

        container.scrollLeft = scrollPosition;
      }
      scrollAnimationRef.current = requestAnimationFrame(autoScroll);
    };

    // タッチ/マウス操作時のみ一時停止
    const handleInteractionStart = () => {
      isPaused = true;
    };

    const handleInteractionEnd = () => {
      // 現在のスクロール位置を、リセット位置内に収める
      scrollPosition = container.scrollLeft % singleSetWidth;
      isPaused = false;
    };

    container.addEventListener('mousedown', handleInteractionStart);
    container.addEventListener('mouseup', handleInteractionEnd);
    container.addEventListener('touchstart', handleInteractionStart);
    container.addEventListener('touchend', handleInteractionEnd);

    // 自動スクロール開始
    autoScroll();

    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
      container.removeEventListener('mousedown', handleInteractionStart);
      container.removeEventListener('mouseup', handleInteractionEnd);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [guestHighlights.images.length]);

  // シームレスなループのために画像を2セット表示
  const duplicatedImages = [...guestHighlights.images, ...guestHighlights.images];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="px-6 max-w-5xl mx-auto mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{guestHighlights.heading}</h2>
        <p className="text-gray-500 mt-2">{guestHighlights.description}</p>
      </div>

      {/* Horizontal Scroll Container - scroll-snap + 慣性スクロール */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-6 px-6 gap-3 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {duplicatedImages.map((img, i) => (
          <div
            key={i}
            className="scroll-item flex-none w-[75vw] md:w-[400px] aspect-[3/4] relative rounded-xl overflow-hidden snap-center"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="75vw"
              className="object-cover"
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

