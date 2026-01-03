import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { content } from "@/data/content";

export const BestShots = () => {
  const { bestShots } = content;

  return (
    <Section className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12 text-gray-900">
        {bestShots.heading}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {bestShots.images.map((img, i) => (
          <div
            key={i}
            className={`relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500 group ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </Section>
  );
};
