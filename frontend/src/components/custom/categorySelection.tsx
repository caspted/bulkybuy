"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const categories = [
  { value: "food", label: "Food" },
  { value: "material", label: "Material" },
  { value: "garbage", label: "Garbage" },
  { value: "equipment", label: "Equipment" },
  { value: "construction", label: "Construction" },
]

interface CategorySelectionProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export function CategorySelection({setCategory} : CategorySelectionProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? categories.find((category) => category.value === value)?.label : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="p-2">
          <input
            type="text"
            placeholder="Search category..."
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredCategories.length === 0 ? (
          <div className="p-2 text-center text-sm">No category found.</div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCategories.map((category) => (
              <div
                key={category.value}
                className={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                  value === category.value
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => {
                  setValue(value === category.value ? "" : category.value)
                  setCategory(value === category.value ? "" : category.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn("mr-2 h-4 w-4", value === category.value ? "opacity-100" : "opacity-0")}
                />
                {category.label}
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}