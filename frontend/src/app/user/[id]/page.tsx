"use client";

import { useState, useEffect, FC } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell, TableRow, TableHeader, TableHead, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, Product } from "@/utils/types"


export default function UserProfile() {
  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [product, setProduct] = useState<Product[]>([])
  const [wallet, setWallet] = useState()

  useEffect(() => {
    if (id) {
      getUser(id as string)
    }
  }, [id])

  const getUser = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data)
    } catch (error) {
      console.error(error)
    }
}

  const getProducts = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}/products`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setProduct(data)
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
          <CardContent>
            <div>
              <h1>Balance: $5500</h1>
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