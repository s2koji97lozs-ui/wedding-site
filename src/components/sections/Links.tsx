import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { content } from '@/data/content';

// アイコンコンポーネント
const GalleryIcon = () => (
  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const Links = () => {
  const { links } = content;
  const cards = [
    { ...links.viewGallery, icon: <GalleryIcon /> },
    { ...links.downloadData, icon: <DownloadIcon /> }
  ];

  return (
    <Section className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8 text-gray-900">
        {links.heading}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="w-12 h-12 mb-3 rounded-full bg-gray-50 flex items-center justify-center">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-xs md:text-sm text-gray-500 mb-4 leading-relaxed">
              {card.description}
            </p>

            {/* Button */}
            <Button
              href={card.button.url}
              label={card.button.label}
              isExternal={card.button.isExternal}
              variant="primary"
            />
          </div>
        ))}
      </div>
    </Section>
  );
};

