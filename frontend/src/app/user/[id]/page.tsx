"use client";

import { useState, useEffect, FC } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell, TableRow, TableHeader, TableHead, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, Product, Wallet, Transaction } from "@/utils/types"
import getUser from "@/utils/getUser";
import getOwnProducts from "@/utils/getOwnProducts";
import getWallet from "@/utils/getWallet";
import getTransactions from "@/utils/getTransactions";


export default function UserProfile() {
  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [product, setProduct] = useState<Product[]>([])
  const [wallet, setWallet] = useState<Wallet>()
  const [transaction, setTransaction] = useState<Transaction>()

  useEffect(() => {
    if (id) {
      fetchUser()
      fetchProducts()
      fetchWallet()
      fetchTransaction()
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

  const fetchTransaction = async () => {
    try {
      const transactionData = await getTransactions();
      setTransaction(transactionData)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="flex flex-row space-x-4 mx-4">
      <div className="flex flex-col w-1/3 mt-8 space-y-8 ">
        <Card key={user?.id}  className="shadow-lg w-full">
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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              Wallet Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div key={wallet?.id}>
              <h1>Balance: {wallet?.balance}</h1>
            </div>
            <div key={transaction?.id} className="my-8">
              <h1>Latest Transaction: {transaction?.amount} </h1>
            </div>
            <div>
              <Button>
                Add money
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col w-2/3 mt-8 space-y-8">
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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              Your Bids
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Auction</TableHead>
                  <TableHead>Your Bid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auctions.map(auctions => (
                  <TableRow key={auctions.id}>
                    <TableCell>{auctions.product}</TableCell>
                    <TableCell>{auctions.bid}</TableCell>
                    <TableCell>{auctions.status}</TableCell>
                    <TableCell>{auctions.date}</TableCell>
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

const auctions = [{
  id: 1,
  product: 'Macbook Pro',
  bid: 1000,
  status: 'Active',
  date: '2021-08-01',
},
{
  id: 2,
  product: 'iPhone 12',
  bid: 800,
  status: 'Sold',
  date: '2021-08-02',
},
{
  id: 3,
  product: 'iPad Pro',
  bid: 600,
  status: 'Active',
  date: '2021-08-03',
},
{
  id: 4,
  product: 'Apple Watch',
  bid: 400,
  status: 'Sold',
  date: '2021-08-04',
},
{
  id: 5,
  product: 'AirPods',
  bid: 200,
  status: 'Active',
  date: '2021-08-05',
}]