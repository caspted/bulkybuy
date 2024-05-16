import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { PaginationUse } from "@/components/custom/paginationUse";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-dot-black/[0.2] p-24 pt-16">
      <div className="flex flex-col px-16 w-4/5">
        <TypewriterEffectSmooth words={words} className="mx-auto"/>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eos deserunt iusto accusamus beatae consequatur harum numquam soluta sapiente autem veritatis incidunt eveniet eligendi voluptates adipisci, error possimus, totam odio.
        </p>
      </div>
      <section className="mt-8">
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
            />
          ))}
        </BentoGrid>
        <PaginationUse pages={5} currentPage={1}/>
      </section>
    </main>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
  },
];

const words = [
  {
    text: "Bulk",
  },
  {
    text: "Buy",
  },
  {
    text: "with",
  },
  {
    text: "BulkyBuy.",
    className: "text-blue-500 dark:text-blue-500",
  },
];