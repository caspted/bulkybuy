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
import { CategorySelection } from "@/components/custom/categorySelection";
import createProduct from "@/utils/createProduct";
import {useRouter} from "next/navigation";

export default function Products() {
  const router = useRouter()
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

  const handleCreateProduct = async () => {
    try {
      await createProduct(name, description, category, file);
      router.push('/');
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
                      id="productDescription"
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
                    <Label>Image</Label>
                    <input onChange={fileSelected} type="file" accept="image/*"></input>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                className="w-full bg-black"
                id="createButton"
                onClick={() => {handleCreateProduct()}}>
                Create
              </Button>
              {/* <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full bg-black">Create</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Payment will be taken form you wallet balance.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {createProduct(name, description, category, file)}}>
                      Create!
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}
            </CardFooter>
          </Card>

        </div>
      </div>
    </main>
  );
}