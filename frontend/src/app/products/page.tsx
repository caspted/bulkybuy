"use client"
import React, {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table"
import { useRouter } from "next/navigation"
import { Product } from "@/utils/types";
import getOwnProducts from "@/utils/getOwnProducts";
import useFetchData from "@/hooks/useFetchData";

export default function Products() {
  const router = useRouter()
  const {data, error} = useFetchData<Product[]>(getOwnProducts)

  if (!data) {
    return (
      <main className="flex flex-col items-center bg-dot-black/[0.2] p-24 pt-16"
      style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex flex-row justify-between w-full">
        <h3 className="text-2xl font-bold">
          Your products
        </h3>
        <Button onClick={() => router.push("/products/create")}> + Add new </Button>
      </div>
    </main>
    )
  }

  return (
    <main className="flex flex-col items-center bg-dot-black/[0.2] p-24 pt-16"
      style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex flex-row justify-between w-full">
        <h3 className="text-2xl font-bold">
          Your products
        </h3>
        <Button onClick={() => router.push("/products/create")}> + Add new </Button>
      </div>
      <DataTable data={data}/>
    </main>
  );
}