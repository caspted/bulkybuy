import React from "react";
import getProduct from "@/utils/getProduct";
import getImage from "@/utils/getImage";

interface ProductsProps {
  params: {
    id: string;
  };
}

export default async function Products({ params }: ProductsProps) {
  const productId = Number(params.id)
  const productData = await getProduct(productId)
  console.log(productData.image_url)
  // const Image = await getImage(productData.image_url)
  // console.log(Image)

  return (
    <main className="flex flex-col items-center bg-dot-black/[0.2] p-24 pt-16"
      style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex flex-col justify-between px-16 w-4/5">

        <div
          className="row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border justify-between flex flex-col space-y-4"
        >
          <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">

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
          </div>
        </div>
      </div>
    </main>
  );
}