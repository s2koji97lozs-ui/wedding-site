'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
    src: string;
    alt: string;
    sizes: string;
    priority?: boolean;
    quality?: number;
    className?: string;
    onOrientationDetect?: (orientation: 'portrait' | 'landscape' | 'square') => void;
}

/**
 * 最適化された画像コンポーネント
 * - フェードインアニメーション
 * - スケルトン表示
 * - 縦横自動判定（オプション）
 */
export const OptimizedImage = ({
    src,
    alt,
    sizes,
    priority = false,
    quality = 85,
    className = '',
    onOrientationDetect,
}: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // onLoadingComplete は Next.js Image が提供する正しい naturalWidth/Height を返す
    const handleLoadingComplete = (result: { naturalWidth: number; naturalHeight: number }) => {
        setIsLoaded(true);

        if (onOrientationDetect) {
            const ratio = result.naturalWidth / result.naturalHeight;
            if (ratio > 1.2) {
                onOrientationDetect('landscape');
            } else if (ratio < 0.8) {
                onOrientationDetect('portrait');
            } else {
                onOrientationDetect('square');
            }
        }
    };

    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
                } ${className}`}
            onLoadingComplete={handleLoadingComplete}
        />
    );
};
