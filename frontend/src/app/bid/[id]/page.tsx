"use client"
import React, { useState, useEffect } from "react";
import getProduct from "@/utils/getProduct";
import getAuction from "@/utils/getAuction";
import getImage from "@/utils/getImage";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product, Auction } from "@/utils/types";
import createBid from "@/utils/createBid";
import { useRouter } from "next/navigation";

interface ProductsProps {
  params: {
    id: string;
  };
}

type ImageUrl = {
  imageUrl: string
}

export default function BidForm({ params }: ProductsProps) {
  const router = useRouter()
  const productId = Number(params.id)
  const [productData, setProductData] = useState<Product>()
  const [imageUrl, setImageUrl] = useState<ImageUrl>()
  const [bid, setBid] = useState<number>(0)
  const [auctionData, setAuctionData] = useState<Auction>()

  useEffect(() => {
    async function loadData() {
      const productData = await getProduct(productId)
      const imageUrl = await getImage(productData.image_url)
      setProductData(productData)
      setImageUrl(imageUrl)
  
      getAuction(productId)
        .then(auction => {
          setAuctionData(auction[0])
          if (auction) {
            console.log(auction)
            console.log(auction[0].id)
          }
        })
    }
    loadData()
  }, [productId])

  const handleCreateBid = async () => {
    try {
      await createBid(bid, auctionData?.id ?? 0);
      router.push('/products');
      console.log("Auction created")
      console.log(bid, auctionData?.id ?? 0)
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };

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
            <div>
              <div className="font-sans font-bold text-xl text-neutral-600 dark:text-neutral-200 mb-2">
                Auction ends: {auctionData?.date_ends ? new Date(auctionData.date_ends).toLocaleDateString() : 'Unknown'}
                {/* connect auction db table and display date_ends of auction here */}
              </div>
            </div>
            <div className="relative w-full" style={{ paddingTop: '60%' }}>
              {imageUrl &&
                <Image
                  src={imageUrl.imageUrl}
                  alt="Image from URL"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              }
            </div>
            <div className="group-hover/bento:translate-x-2 transition duration-200">
              <div className="font-sans font-bold text-3xl text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                {productData?.name}
              </div>
              <div className="bg-gray-300 w-auto p-1 inline-block px-2 rounded-full text-xs">
                {productData?.category}
              </div>
              <div className="font-sans font-normal text-neutral-600 text-md mt-2 dark:text-neutral-300">
                {productData?.description}
              </div>
              <div className="font-sans font-normal text-neutral-600 text-md mt-2 dark:text-neutral-300">
                Minimum bid: {String(auctionData?.minimum_bid)}
                {/* display minimum bid from auction db table */}
              </div>
              <div className="font-sans font-bold text-xl text-neutral-600 dark:text-neutral-200 mt-8">
                Bid form:
              </div>
              <div>
                <form>
                  <div className="grid gap-4 py-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="bid" className="text-right">
                        Your offer:
                      </Label>
                      <Input
                        id="bid"
                        defaultValue="100"
                        className="col-span-3"
                        type="number"
                        onChange={(e) => setBid(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="mt-8">
                <Button onClick={() => {handleCreateBid()}}>Offer bid</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
