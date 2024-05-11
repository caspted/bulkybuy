"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table"
import { useRouter } from "next/navigation"

export default function Products() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center bg-dot-black/[0.2] p-24 pt-16"
      style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex flex-row justify-between px-16 w-4/5">
        <h3 className="text-2xl font-bold">
          Your products
        </h3>
        <Button onClick={() => router.push("/products/create")}> + Add new </Button>
      </div>
      <DataTable/>
    </main>
  );
}