"use client"

import React, {useState} from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Products() {
  const [name, setName] = useState("")

  return (
    <main className="flex flex-col items-center bg-dot-black/[0.2] p-24 pt-16"
      style={{ height: "calc(100vh - 100px)" }}>
      <div className="flex flex-col justify-between px-16 w-4/5">
        <h3 className="text-2xl font-bold">
          Product
        </h3>

      </div>
    </main>
  );
}