import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import React from "react"

interface PaginationUseProps {
  pages: number
  currentPage?: number
}

export function PaginationUse({ pages, currentPage }: PaginationUseProps) {
  const currentPageAt = currentPage ? currentPage : 1

  function PaginationItemList() {
    let paginationItems = []

    for (let i = 1; i <= pages; i++) {
      paginationItems.push(PaginationItemInfo(i, `/auctions/${i}`, i === currentPageAt))
    }

    return paginationItems
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {currentPageAt > 1 &&
          <PaginationPrevious>
            <PaginationNext href={`/auctions/${currentPageAt - 1}`} />
          </PaginationPrevious>
        }
        {PaginationItemList().map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {currentPageAt < pages &&
          <PaginationItem>
            <PaginationNext href={`/auctions/${currentPageAt + 1}`} />
          </PaginationItem>
        }
      </PaginationContent>
    </Pagination>
  )
}

function PaginationItemInfo(pageNumber: number, url: string, isActive: boolean) {
  return (
    <PaginationItem>
      <PaginationLink href={url} isActive={isActive}>{pageNumber}</PaginationLink>
    </PaginationItem>
  )
}