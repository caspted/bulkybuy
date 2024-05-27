"use client"
import React, { useState, useEffect } from "react";
import getProduct from "@/utils/getProduct";
import getImage from "@/utils/getImage";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/utils/types";
import createAuction from "@/utils/createAuction";

interface ProductsProps {
  params: {
    id: string;
  };
}

type ImageUrl = {
  imageUrl: string
}

export default function Products({ params }: ProductsProps) {
  const productId = Number(params.id)
  const [productData, setProductData] = useState<Product>()
  const [imageUrl, setImageUrl] = useState<ImageUrl>()
  const [date_ends, setDateEnds] = useState<Date>()
  const [minimum_bid, setMinimumBid] = useState<number>()

  useEffect(() => {
    async function loadData() {
      const productData = await getProduct(productId)
      const imageUrl = await getImage(productData.image_url)
      setProductData(productData)
      setImageUrl(imageUrl)
    }
    loadData()
  }, [productId])

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
              <div className="mt-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">Start Auction</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Auction Details</DialogTitle>
                      <DialogDescription>
                        Please input the details of the auction. Once you confirm, the auction will start.
                      </DialogDescription>
                    </DialogHeader>
                      <form>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date_ends" className="text-right">
                              End Date:
                            </Label>
                            <Input
                              id="date_ends"
                              defaultValue={new Date().toISOString().split('T')[0]}
                              className="col-span-3"
                              type="date"
                              onChange={(e) => setDateEnds(new Date(e.target.value))}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="minimum_bid" className="text-right">
                              Minimum Bid:
                            </Label>
                            <Input
                              id="minimum_bid"
                              defaultValue="100"
                              className="col-span-3"
                              type="number"
                              onChange={(e) => setMinimumBid(Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </form>
                    <Button type="submit" onClick={() => {date_ends && minimum_bid && createAuction(date_ends, minimum_bid, productId)}}>Confirm Auction</Button>
                  </DialogContent>
                </Dialog>
                {/* [Needs fixing] does not submit the form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
