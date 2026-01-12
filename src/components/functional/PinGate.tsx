'use client';

import { useState, FormEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/data/content';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

interface PinGateProps {
  children: ReactNode;
}

// プリフェッチ対象画像のリストを取得
const getImagesToPreload = () => {
  const guestImages = content.guestPerspectives.cards
    .slice(0, 6) // 最初の6枚をプリロード
    .map(card => card.photo.src);

  return [
    content.hero.bgImage.src,
    ...content.bestShots.images.map(img => img.src),
    ...guestImages,
  ];
};

export default function PinGate({ children }: PinGateProps) {
  const { security } = content;
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!security.enabled);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(!security.enabled);
  const [error, setError] = useState('');

  // 進捗追跡
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [progress, setProgress] = useState(0);

  // セキュリティが無効な場合は直接子コンポーネントを表示
  if (!security.enabled) {
    return <>{children}</>;
  }

  // 画像をプリフェッチ（進捗付き）
  const prefetchImagesWithProgress = async () => {
    const imagesToPrefetch = getImagesToPreload();
    setTotalCount(imagesToPrefetch.length);
    setLoadedCount(0);
    setProgress(0);

    let loaded = 0;

    const promises = imagesToPrefetch.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          setProgress(Math.round((loaded / imagesToPrefetch.length) * 100));
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
          setProgress(Math.round((loaded / imagesToPrefetch.length) * 100));
          resolve();
        };
        img.src = src;
      });
    });

    await Promise.all(promises);

    // 100%表示を少し見せる
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (pin === security.pinCode) {
      setIsAuthenticated(true);
      setIsLoading(true);
      setPin('');

      // 画像プリフェッチ（進捗付き）
      await prefetchImagesWithProgress();

      setIsLoading(false);
      setIsReady(true);
    } else {
      setError('PINコードが正しくありません');
      setPin('');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated && (
        <motion.div
          key="pin-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-white flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl p-8 md:p-10">
              {/* Header - Apple風ミニマルタイポグラフィ */}
              <div className="text-center mb-12">
                <h1 className="text-[11px] text-gray-400 tracking-[0.4em] uppercase font-medium">
                  Private
                </h1>
                <div className="w-8 h-px bg-gray-200 mx-auto mt-4" />
              </div>

              {/* PIN Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="• • • •"
                    className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] font-light rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 outline-none transition-all bg-gray-50"
                    autoFocus
                    maxLength={10}
                  />
                </div>

                {error && (
                  <div className="text-gray-500 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-medium py-3.5 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 active:scale-[0.98]"
                >
                  Enter
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}

      {isAuthenticated && isLoading && (
        <LoadingOverlay
          isVisible={true}
          progress={progress}
          loadedCount={loadedCount}
          totalCount={totalCount}
        />
      )}

      {isAuthenticated && isReady && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
