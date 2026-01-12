'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

interface LoadingOverlayProps {
    isVisible: boolean;
    progress?: number;
    loadedCount?: number;
    totalCount?: number;
}

const loadingTexts = [
    'Loading Assets...',
    'Preparing the Day...',
    'Almost Ready...',
];

export const LoadingOverlay = ({
    isVisible,
    progress = 0,
    loadedCount = 0,
    totalCount = 0,
}: LoadingOverlayProps) => {
    // プログレスに応じてテキストを切り替え
    const currentTextIndex = useMemo(() => {
        if (progress < 40) return 0;
        if (progress < 80) return 1;
        return 2;
    }, [progress]);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
        >
            <div className="flex flex-col items-center w-full max-w-sm px-8">
                {/* プログレスバー */}
                <div className="w-full">
                    {/* レール */}
                    <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gray-900 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        />
                    </div>

                    {/* フェードテキスト */}
                    <div className="mt-6 h-5 relative">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentTextIndex}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                                className="text-xs text-gray-400 tracking-widest uppercase text-center absolute inset-0"
                            >
                                {loadingTexts[currentTextIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* カウンター */}
                    <p className="text-[10px] text-gray-300 tracking-wider text-center mt-2">
                        {loadedCount} / {totalCount}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
