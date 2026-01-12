'use client';

import { motion } from 'framer-motion';

interface LoadingOverlayProps {
    isVisible: boolean;
}

export const LoadingOverlay = ({ isVisible }: LoadingOverlayProps) => {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
        >
            <div className="flex flex-col items-center">
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

                {/* Loading indicator */}
                <motion.div
                    className="mt-8 flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gray-400"
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};
