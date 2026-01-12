'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number; // ms
}

/**
 * スクロール時に軽いフェード+上移動で表示するコンポーネント
 * Apple風の控えめなアニメーション
 */
export const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // 一度表示されたら監視を解除
                    setTimeout(() => setIsVisible(true), delay);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px', // 少し早めに発火
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                } ${className}`}
        >
            {children}
        </div>
    );
};
