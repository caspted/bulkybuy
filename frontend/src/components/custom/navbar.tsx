"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const firstPathSegment = pathname.split('/')[1]

  if (firstPathSegment === "login" || firstPathSegment === "register") {
    return null
  }

  return (
    <header className="flex items-center w-full h-20 gap-4 bg-white border border-b-1 p-4">
      <Link href="/">
        <h3 className="font-bold text-xl mr-8">BulkyBuy</h3>
      </Link>

      <Link href="/">
        <p className={`${firstPathSegment === "" ? 'text-black' : ' text-gray-400'}`}>
          Home
        </p>
      </Link>

      <Link href="/auctions">
        <p className={`${firstPathSegment === "auctions" ? 'text-black' : 'text-gray-400'}`}>
          Auctions
        </p>
      </Link>

      <Link href="/products">
        <p className={`${firstPathSegment === "products" ? ' text-black' : 'text-gray-400'}`}>
          Your Products
        </p>
      </Link>

      <Link href="/users/:id">
        <p className={`${firstPathSegment === "useres" ? " text-black" : "text-gray-400"} `}>
          User Profile
        </p>
      </Link>
    </header>
  )
}