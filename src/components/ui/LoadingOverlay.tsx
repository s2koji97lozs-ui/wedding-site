'use client';

import { motion } from 'framer-motion';

interface LoadingOverlayProps {
    isVisible: boolean;
    progress?: number; // 0-100
    loadedCount?: number;
    totalCount?: number;
}

export const LoadingOverlay = ({
    isVisible,
    progress = 0,
    loadedCount = 0,
    totalCount = 0,
}: LoadingOverlayProps) => {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
        >
            <div className="flex flex-col items-center w-full max-w-xs px-8">
                {/* イニシャルロゴ with pulse animation */}
                <motion.div
                    className="relative"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="text-5xl md:text-6xl font-serif tracking-widest text-gray-800">
                        K & S
                    </div>
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                </motion.div>

                {/* Progress bar */}
                <div className="w-full mt-10">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                    </div>

                    {/* Progress text */}
                    <div className="mt-3 text-center">
                        <p className="text-sm text-gray-500">
                            Loading photos...
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {loadedCount} / {totalCount}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
