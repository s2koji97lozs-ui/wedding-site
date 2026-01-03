'use client'; // videoタグの制御のためClient Component推奨

import { useEffect, useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { content } from '@/data/content';

export const Movie = () => {
  const { movie } = content;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || movie.source.mode !== 'file') return;

    // 動画の自動再生を確実にする
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // 自動再生が成功
          console.log('Video autoplay started');
        })
        .catch((error) => {
          // 自動再生がブロックされた場合
          console.log('Video autoplay was prevented:', error);
          // ユーザーインタラクション後に再生を試みる
          const tryPlay = () => {
            video.play().catch(() => {});
            document.removeEventListener('click', tryPlay);
            document.removeEventListener('touchstart', tryPlay);
          };
          document.addEventListener('click', tryPlay, { once: true });
          document.addEventListener('touchstart', tryPlay, { once: true });
        });
    }
  }, []);

  return (
    <Section className="bg-black text-white text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{movie.heading}</h2>
        <p className="text-gray-400">{movie.description}</p>
      </div>

      <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {movie.source.mode === 'file' ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={movie.poster.src}
            controls={movie.source.config.controls}
            autoPlay={movie.source.config.autoPlay}
            loop={movie.source.config.loop}
            muted={movie.source.config.muted}
            playsInline
          >
            <source src={movie.source.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${movie.source.videoId}?rel=0&autoplay=1&mute=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Section>
  );
};
