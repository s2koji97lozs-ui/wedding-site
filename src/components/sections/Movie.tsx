'use client';

import { Section } from '@/components/ui/Section';
import { content } from '@/data/content';

export const Movie = () => {
  const { movie } = content;

  return (
    <Section className="bg-black text-white text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{movie.heading}</h2>
        <p className="text-gray-400">{movie.description}</p>
      </div>

      <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {movie.source.mode === 'file' ? (
          <video
            className="w-full h-full object-cover"
            poster={movie.poster.src}
            controls
            muted
            playsInline
            preload="metadata"
          >
            <source src={movie.source.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${movie.source.videoId}?rel=0`}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Section>
  );
};
