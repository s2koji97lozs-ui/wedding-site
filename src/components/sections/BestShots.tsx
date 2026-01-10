import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { content } from "@/data/content";

export const BestShots = () => {
  const { bestShots } = content;

  // Bento風レイアウト: インデックス0と3を大きく表示
  const isLargeCard = (index: number) => index === 0 || index === 3;

  return (
    <Section className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8 text-gray-900">
        {bestShots.heading}
      </h2>

      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {bestShots.images.map((img, i) => (
          <div
            key={i}
            className={`relative rounded-lg overflow-hidden group ${isLargeCard(i) ? "col-span-2 aspect-[16/10]" : "aspect-square"
              }`}
            style={{ minHeight: isLargeCard(i) ? 200 : 120 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={isLargeCard(i) ? "100vw" : "50vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </Section>
  );
};
