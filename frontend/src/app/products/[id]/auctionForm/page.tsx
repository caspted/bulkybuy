"use client"

import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useRouter} from "next/navigation";
import createAuction from "@/utils/createAuction";

interface ProductsProps {
  params: {
    id: string;
  };
}

export default function ProductAuction({ params }: ProductsProps) {
  const router = useRouter()
  const productId = Number(params.id)
  const [date_ends, setDateEnds] = useState<Date>(new Date())
  const [minimum_bid, setMinimumBid] = useState<number>(100)

  const handleCreateAuction = async () => {
    try {
      await createAuction(date_ends, minimum_bid, productId);
      router.push('/products');
      console.log("Auction created")
      console.log(date_ends, minimum_bid, productId)
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };


  return (
    <main className="flex flex-row bg-dot-black/[0.2]"
      style={{ height: "calc(100vh - 100px)" }}>
      <div className="pl-4 pt-4 w-1/5">
        <Button onClick={
          () => window.history.back()
        }>Back</Button>
      </div>
      <div className="flex flex-col items-center w-3/5 py-32">
        <div className="flex flex-col justify-between w-full">
          <Card className="w-[500px] h-auto m-auto">
            <CardHeader>
              <CardTitle>Auction Detials</CardTitle>
            </CardHeader>
            <CardContent>
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
                      type="Date"
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full bg-black">Open for Auction</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {handleCreateAuction()}}>
                      Start Auction!
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>

        </div>
      </div>
    </main>
  );
}