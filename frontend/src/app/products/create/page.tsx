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
import { CategorySelection } from "@/components/custom/categorySelection";
import createProduct from "@/utils/createProduct";
import { toast } from "sonner";

export default function Products() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  return (
    <main className="flex flex-col items-center bg-dot-black/[0.2] p-24 pt-16"
      style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex flex-col justify-between px-16 w-4/5 gap-4">
        <Card className="w-[500px] h-auto m-auto">
          <CardHeader>
            <CardTitle>Create New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Product Name"
                    className="focus-visible:ring-grey-400"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Product Description">Description</Label>
                  <Input
                    id="Product Description"
                    placeholder="Product Description"
                    className="focus-visible:ring-grey-400"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Category">Category</Label>
                  <CategorySelection setCategory={setCategory}/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Image</Label>
                  <input onChange={fileSelected} type="file" accept="image/*"></input>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full bg-black" onClick={() => {
              createProduct(name, description, category, file)
              toast("Your product has been created", {
                description: "You may now return to the products page to view your new product.",
              })}
            }>
              Create
            </Button>
          </CardFooter>
        </Card>

      </div>
    </main>
  );
}