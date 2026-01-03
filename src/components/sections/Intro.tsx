import { Section } from '@/components/ui/Section';
import { content } from '@/data/content';

export const Intro = () => {
  const { intro } = content;
  return (
    <Section className="bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-12">
        {intro.heading}
      </h2>
      <div className="space-y-6">
        {intro.paragraphs.map((text, i) => (
          <p key={i} className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            {text}
          </p>
        ))}
      </div>
    </Section>
  );
};
