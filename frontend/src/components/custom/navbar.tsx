"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Button } from "../ui/button"
import fetchUser from "@/utils/fetchUser"
import { useEffect, useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const firstPathSegment = pathname.split('/')[1]
  const router = useRouter()
  const [username, setUsername] = useState("")

  useEffect(() => {
    async function getUserName() {
      const token = localStorage.getItem('token') || null
    
      if (token) {
        const user = await fetchUser()
        setUsername(user.name)
      } else {
        router.push("/login")
      }
    }

    getUserName()
  }, [])

  function logout() {
    localStorage.clear()
    router.push('/login')
  }

  if (firstPathSegment === "login" || firstPathSegment === "register") {
    return null
  }

  return (
    <header className="flex justify-between w-full h-20 gap-4 bg-white border border-b-1 p-4">
      <div className="flex gap-4 items-center">
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
      </div>
      
       <Link href="/users/:id">
        <p className={`${firstPathSegment === "users" ? " text-black" : "text-gray-400"} `}>
          User Profile
        </p>
      </Link>
      
      <div className="flex gap-4 items-center">
        {username !== "" && <p> Hello {username} </p>}
        <Button onClick={() => logout()}> Logout </Button>
      </div>
    </header>
  )
}