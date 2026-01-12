'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { content } from '@/data/content';

// 画像カードコンポーネント
const ImageCard = ({
  img,
  index,
  isLarge
}: {
  img: { src: string; alt: string };
  index: number;
  isLarge: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Reveal delay={index * 80} className={isLarge ? 'col-span-2' : ''}>
      <motion.div
        className={`relative rounded-lg overflow-hidden bg-gray-100 ${isLarge ? 'aspect-[16/10]' : 'aspect-square'
          }`}
        style={{ minHeight: isLarge ? 200 : 120 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={isLarge ? '100vw' : '50vw'}
            priority={index < 2}
            className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>
      </motion.div>
    </Reveal>
  );
};

export const BestShots = () => {
  const { bestShots } = content;
  const sectionRef = useRef<HTMLElement>(null);

  // パララックス用スクロール値
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // 見出しのパララックス効果（控えめ）
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  // Bento風レイアウト: インデックス0と3を大きく表示
  const isLargeCard = (index: number) => index === 0 || index === 3;

  return (
    <Section ref={sectionRef} className="bg-gray-50">
      {/* パララックス見出し */}
      <motion.div
        style={{ y: headingY, opacity: headingOpacity }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          {bestShots.heading}
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {bestShots.images.map((img, i) => (
          <ImageCard
            key={i}
            img={img}
            index={i}
            isLarge={isLargeCard(i)}
          />
        ))}
      </div>
    </Section>
  );
};
