'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { content, GuestPerspectiveCard } from '@/data/content';

// ベストショットカード
const BestShotCard = ({ card }: { card: Extract<GuestPerspectiveCard, { type: 'bestShot' }> }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'square'>('portrait');

    useEffect(() => {
        const image = new window.Image();
        image.onload = () => {
            const ratio = image.naturalWidth / image.naturalHeight;
            if (ratio > 1.2) setOrientation('landscape');
            else if (ratio < 0.8) setOrientation('portrait');
            else setOrientation('square');
        };
        image.src = card.photo.src;
    }, [card.photo.src]);

    // 高さ統一アプローチ
    const getCardDimensions = () => {
        const heightMobile = 70;
        const heightDesktop = 450;

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
            default:
                return {
                    width: `min(${heightMobile * 3 / 4}vw, ${heightDesktop * 3 / 4}px)`,
                    height: `min(${heightMobile}vw, ${heightDesktop}px)`,
                };
        }
    };

    const dimensions = getCardDimensions();

    return (
        <Reveal>
            <div
                className="relative rounded-2xl overflow-hidden bg-white shadow-sm flex-none snap-center"
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    scrollSnapStop: 'always',
                }}
            >
                <Image
                    src={card.photo.src}
                    alt={card.photo.alt}
                    fill
                    sizes="(max-width: 768px) 88vw, 720px"
                    className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                />
                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <p className="text-white/70 text-xs font-medium mb-1 tracking-wide uppercase">
                        Photo by {card.photographer}
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-1">
                        {card.title}
                    </h3>
                    {card.description && (
                        <p className="text-white/80 text-sm font-light leading-relaxed">
                            {card.description}
                        </p>
                    )}
                </div>
            </div>
        </Reveal>
    );
};

// Specialサンクスカード
const SpecialThanksCard = ({ card }: { card: Extract<GuestPerspectiveCard, { type: 'specialThanks' }> }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Reveal>
            <div className="bg-gray-50 rounded-xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 min-w-[280px] md:min-w-[320px] flex-none snap-center">
                {/* 顔写真 - 長押し保存防止 */}
                <div
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 select-none"
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <Image
                        src={card.photo.src}
                        alt={card.photo.alt}
                        fill
                        sizes="96px"
                        className={`object-cover object-center transition-opacity duration-500 pointer-events-none ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                        draggable={false}
                    />
                </div>
                {/* テキスト */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 text-base md:text-lg font-semibold truncate">
                        {card.name}
                    </h3>
                    <p className="text-gray-500 text-sm font-light leading-snug mt-1">
                        {card.caption}
                    </p>
                </div>
            </div>
        </Reveal>
    );
};

export const GuestPerspective = () => {
    const { guestPerspectives } = content;

    // カードを種類別に分類
    const bestShotCards = guestPerspectives.cards.filter(
        (card): card is Extract<GuestPerspectiveCard, { type: 'bestShot' }> => card.type === 'bestShot'
    );
    const specialThanksCards = guestPerspectives.cards.filter(
        (card): card is Extract<GuestPerspectiveCard, { type: 'specialThanks' }> => card.type === 'specialThanks'
    );

    return (
        <section className="py-20 bg-white overflow-hidden">
            {/* ヘッダー */}
            <Reveal className="px-6 max-w-5xl mx-auto mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                    {guestPerspectives.heading}
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                    {guestPerspectives.description}
                </p>
            </Reveal>

            {/* ベストショット枠 - 横スクロール */}
            {bestShotCards.length > 0 && (
                <div className="mb-12">
                    <Reveal className="px-6 max-w-5xl mx-auto mb-4">
                        <h3 className="text-lg font-medium text-gray-700 tracking-wide">
                            Best Shots
                        </h3>
                    </Reveal>
                    <div
                        className="flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory"
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
                        {bestShotCards.map((card, i) => (
                            <BestShotCard key={i} card={card} />
                        ))}
                    </div>
                </div>
            )}

            {/* Specialサンクス枠 - 横スクロール */}
            {specialThanksCards.length > 0 && (
                <div>
                    <Reveal className="px-6 max-w-5xl mx-auto mb-4">
                        <h3 className="text-lg font-medium text-gray-700 tracking-wide">
                            Special Thanks
                        </h3>
                    </Reveal>
                    <div
                        className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory"
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
                        {specialThanksCards.map((card, i) => (
                            <SpecialThanksCard key={i} card={card} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};
