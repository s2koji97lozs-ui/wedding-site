'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { content } from '@/data/content';

export const Links = () => {
  const { links } = content;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="py-16 md:py-24 px-6">
      <Link
        href={links.url}
        target={links.isExternal ? '_blank' : undefined}
        rel={links.isExternal ? 'noopener noreferrer' : undefined}
        className="block max-w-5xl mx-auto"
      >
        <motion.div
          className="relative w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden cursor-pointer"
          whileHover={{
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {/* Background Image with Zoom on Hover */}
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src={links.bgImage.src}
              alt={links.bgImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
              className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              onLoad={() => setIsLoaded(true)}
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {links.heading}
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-white/80 font-light tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {links.subheading}
            </motion.p>

            {/* Arrow Icon */}
            <motion.div
              className="mt-8 w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.9)' }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
};
