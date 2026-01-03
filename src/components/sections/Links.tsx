import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { content } from '@/data/content';

export const Links = () => {
  const { links } = content;
  const cards = [links.viewGallery, links.downloadData];

  return (
    <Section className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12 text-gray-900">
        {links.heading}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="relative h-[500px] rounded-3xl overflow-hidden group">
            {/* Background */}
            <Image
              src={card.bgImage.src}
              alt={card.bgImage.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white">
              <h3 className="text-3xl font-bold mb-4 tracking-tight">{card.title}</h3>
              <p className="text-lg text-gray-200 mb-8 max-w-xs leading-relaxed">
                {card.description}
              </p>
              <Button 
                href={card.button.url} 
                label={card.button.label} 
                isExternal={card.button.isExternal}
                variant="blur"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
