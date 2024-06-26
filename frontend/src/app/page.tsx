"use client"
import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { PaginationUse } from "@/components/custom/paginationUse";
import getAuctionProducts from "@/utils/getAuctionProducts";
import getImage from "@/utils/getImage";
import { Product, Auction } from "@/utils/types"
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await getAuctionProducts();
        const productsWithFetchUrl = await Promise.all(products.map(async product => {
          const fetchUrlInitial = await getImage(product.image_url);
          const fetchUrl = fetchUrlInitial.imageUrl
          return { ...product, fetchUrl };
        }));
        setProducts(productsWithFetchUrl);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    getProducts()
  }, [])
  
  return (
    <main className="flex flex-col items-center bg-dot-black/[0.2] p-24 pt-16">
      <div className="flex flex-col px-16 w-4/5">
        <TypewriterEffectSmooth words={words} className="mx-auto" />
        <p className="text-center">
        Welcome to BulkyBuy, the online platform for auctioning products in bulk lots. Sellers can list excess inventory to be auctioned off in desired quantities. Buyers can bid on amazing deals for bulk product lots across numerous categories. Our user-friendly interface streamlines the bulk auction process. Secure transactions protect all participants. Join our vibrant community of bulk buyers and sellers. Maximize your buying and selling potential with BulkyBuy&apos;s competitive bulk auctions. Register today and start your bulk auction journey!
        </p>
      </div>
      <section className="mt-8 flex flex-col w-full">
        <BentoGrid className="max-w-4xl mx-auto w-full">
          {products.map((product, i) => (
            <Link href={`./bid/${product.id}`} key={i}>
              <BentoGridItem
                key={i}
                title={product.name}
                description={product.description}
                header={product.fetchUrl && <Skeleton url={product.fetchUrl} />}
              />
            </Link>
          ))}
        </BentoGrid>
        <PaginationUse pages={5} currentPage={1} />
      </section>
    </main>
  );
}

const Skeleton = ({ url }: { url: string }) => (
  <div className="relative w-full" style={{ paddingTop: '60%' }}>
    <Image
      src={url}
      alt="Image from URL"
      layout="fill"
      objectFit="cover"
      className="rounded-xl"
    />
  </div>
)

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