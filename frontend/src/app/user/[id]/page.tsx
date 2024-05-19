"use client";

import { useState, useEffect, FC } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell, TableRow, TableHeader, TableHead, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, Product, Wallet } from "@/utils/types"
import getUser from "@/utils/getUser";
import getOwnProducts from "@/utils/getOwnProducts";
import getWallet from "@/utils/getWallet";


export default function UserProfile() {
  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [product, setProduct] = useState<Product[]>([])
  const [wallet, setWallet] = useState<Wallet>()

  useEffect(() => {
    if (id) {
      fetchUser()
      fetchProducts()
      fetchWallet()
    }
  }, [id])

  const fetchUser = async () => {
    try {
      const userData = await getUser()
      setUser(userData)
    } catch (error) {
      console.error(error)
    }
}

  const fetchProducts = async () => {
    try {
      const productData = await getOwnProducts()
      setProduct(productData)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchWallet = async () => {
    try {
      const walletData = await getWallet();
      setWallet(walletData);
      } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="flex flex-row space-x-4 mx-4">
      <div className="flex w-1/3 mt-8 ">
      <div className="w-full">
      <Card key={user?.id}  className="shadow-lg">
        <CardHeader>
          <CardTitle>{user?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="my-8">
            <h1> {user?.email} </h1>
          </div>
          <div>
            <h1> {user?.date_registered ? new Date(user.date_registered).toLocaleDateString() : 'N/A'} </h1>
          </div>
        </CardContent>
      </Card>
    </div>
      </div>
      <div className="flex flex-col w-2/3 mt-8 space-y-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              Wallet Info
            </CardTitle>
          </CardHeader>
          <CardContent key={wallet?.id}>
            <div>
              <h1>Balance: {wallet?.balance}</h1>
            </div>
            <div className="my-8">
              <h1>Latest Transaction: $1000</h1>
            </div>
            <div>
              <Button>
                Add money
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              Products Owned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.sold ? 'Sold' : 'Not Sold'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}