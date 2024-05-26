"use client";
import React from "react";
import getProduct from "@/utils/getProduct";
import getImage from "@/utils/getImage";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

interface ProductsProps {
  params: {
    id: string;
  };
}

export default async function Products({ params }: ProductsProps) {
  const productId = Number(params.id)
  const productData = await getProduct(productId)
  const imageUrl = await getImage(productData.image_url)

  return (
    <main className="flex flex-row bg-dot-black/[0.2]" style={{ height: "calc(100vh - 100px)" }}>
      <div className="pl-4 pt-4 w-1/5">
        <Button onClick={
          () => window.history.back()
        }>Back</Button>
      </div>
      <div className="flex flex-col items-center w-3/5 py-8">
        <div className="flex flex-col justify-between w-full">
          <div className="row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border justify-between flex flex-col space-y-4 mb-8">
            <div className="relative w-full" style={{ paddingTop: '60%' }}>
              <Image 
                src={imageUrl.imageUrl} 
                alt="Image from URL" 
                layout="fill" 
                objectFit="cover" 
                className="rounded-xl" 
              />
            </div>
            <div className="group-hover/bento:translate-x-2 transition duration-200">
              <div className="font-sans font-bold text-3xl text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                {productData.name}
              </div>
              <div className="bg-gray-300 w-auto p-1 inline-block px-2 rounded-full text-xs">
                {productData.category}
              </div>
              <div className="font-sans font-normal text-neutral-600 text-md mt-2 dark:text-neutral-300">
                {productData.description}
              </div>
              <div className="mt-8">
                <Button>Start Auction</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
