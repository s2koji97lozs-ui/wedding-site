'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { content, GuestPerspectiveCard } from '@/data/content';

// ベストショットカード - 深みのあるプレミアムデザイン
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

    // 高さ統一、幅は可変
    const getCardStyle = () => {
        const baseHeight = 'min(75vw, 480px)';
        switch (orientation) {
            case 'landscape':
                return { width: 'min(90vw, 720px)', height: baseHeight };
            case 'square':
                return { width: baseHeight, height: baseHeight };
            default:
                return { width: 'min(56vw, 360px)', height: baseHeight };
        }
    };

    const style = getCardStyle();

    return (
        <div
            className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{
                width: style.width,
                height: style.height,
            }}
        >
            {/* 背景のぼかし効果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/20" />

            <Image
                src={card.photo.src}
                alt={card.photo.alt}
                fill
                sizes="(max-width: 768px) 90vw, 720px"
                className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
            />

            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* コンテンツ */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/60 text-[10px] font-medium tracking-[0.2em] uppercase mb-2">
                    Photo by {card.photographer}
                </p>
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                    {card.title}
                </h3>
                {card.description && (
                    <p className="text-white/70 text-sm font-light mt-2 leading-relaxed">
                        {card.description}
                    </p>
                )}
            </div>
        </div>
    );
};

// Specialサンクスカード - 視認性向上
const SpecialThanksCard = ({ card }: { card: Extract<GuestPerspectiveCard, { type: 'specialThanks' }> }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-lg border border-gray-100 flex-shrink-0 w-[300px] md:w-[340px]">
            {/* 顔写真 - アクセントボーダー */}
            <div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100 ring-offset-2 select-none"
                onContextMenu={(e) => e.preventDefault()}
            >
                <Image
                    src={card.photo.src}
                    alt={card.photo.alt}
                    fill
                    sizes="80px"
                    className={`object-cover object-center transition-opacity duration-500 pointer-events-none ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                    draggable={false}
                />
            </div>

            {/* テキスト - フォントウェイト強化 */}
            <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 text-lg font-bold tracking-tight truncate">
                    {card.name}
                </h3>
                <p className="text-gray-400 text-sm font-medium mt-0.5">
                    {card.caption}
                </p>
            </div>
        </div>
    );
};

export const GuestPerspective = () => {
    const { guestPerspectives } = content;

    const bestShotCards = guestPerspectives.cards.filter(
        (card): card is Extract<GuestPerspectiveCard, { type: 'bestShot' }> => card.type === 'bestShot'
    );
    const specialThanksCards = guestPerspectives.cards.filter(
        (card): card is Extract<GuestPerspectiveCard, { type: 'specialThanks' }> => card.type === 'specialThanks'
    );

    return (
        <section className="py-20 bg-gray-50">
            {/* ヘッダー */}
            <Reveal className="px-6 max-w-5xl mx-auto mb-10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                    {guestPerspectives.heading}
                </h2>
                <p className="text-gray-500 mt-3 text-lg font-light">
                    {guestPerspectives.description}
                </p>
            </Reveal>

            {/* ベストショット枠 - 横スクロール */}
            {bestShotCards.length > 0 && (
                <div className="mb-16">
                    <div className="px-6 max-w-5xl mx-auto mb-5">
                        <h3 className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase">
                            Best Shots
                        </h3>
                    </div>

                    {/* スクロールコンテナ - Peek効果付き */}
                    <div
                        className="flex gap-5 overflow-x-auto pb-6 px-6 snap-x snap-mandatory"
                        style={{
                            scrollbarWidth: 'none',
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        {bestShotCards.map((card, i) => (
                            <BestShotCard key={i} card={card} />
                        ))}
                        {/* 右端のPeek用余白 */}
                        <div className="flex-shrink-0 w-1" aria-hidden />
                    </div>
                </div>
            )}

            {/* Specialサンクス枠 - 横スクロール */}
            {specialThanksCards.length > 0 && (
                <div>
                    <div className="px-6 max-w-5xl mx-auto mb-5">
                        <h3 className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase">
                            Special Thanks
                        </h3>
                    </div>

                    {/* スクロールコンテナ - Peek効果付き */}
                    <div
                        className="flex gap-4 overflow-x-auto pb-4 px-6 snap-x snap-mandatory"
                        style={{
                            scrollbarWidth: 'none',
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        {specialThanksCards.map((card, i) => (
                            <SpecialThanksCard key={i} card={card} />
                        ))}
                        {/* 右端のPeek用余白 */}
                        <div className="flex-shrink-0 w-1" aria-hidden />
                    </div>
                </div>
            )}
        </section>
    );
};
