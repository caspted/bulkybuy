"use client"
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { PaginationUse } from "@/components/custom/paginationUse";
import { Product } from "@/utils/types";
import getAuctionProducts from "@/utils/getAuctionProducts";
import getImage from "@/utils/getImage";
import Link from "next/link";
import Image from "next/image";

export default function Auctions() {
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
    <main className="flex flex-col min-h-screen bg-dot-black/[0.2] p-24">
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