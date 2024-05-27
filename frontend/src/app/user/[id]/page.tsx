"use client";

import { useState, useEffect, FC } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell, TableRow, TableHeader, TableHead, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, Product, Wallet, Transaction, Bid } from "@/utils/types"
import getUser from "@/utils/getUser";
import getOwnBids from "@/utils/getOwnBids";
import getOwnProducts from "@/utils/getOwnProducts";
import getWallet from "@/utils/getWallet";
import getTransactions from "@/utils/getTransactions";
import { updateWalletBalance } from "@/utils/updateWalletBalance";
import { createWallet } from "@/utils/createWallet";
import { AddMoneyDropdown } from "@/components/custom/addMoneyDropDown";


export default function UserProfile() {
  const { id } = useParams()
  const userId = Number(id)

  const [user, setUser] = useState<User | null>(null)
  const [product, setProduct] = useState<Product[]>([])
  const [wallet, setWallet] = useState<Wallet>()
  const [transaction, setTransaction] = useState<Transaction>()
  const [bidData, setBidData] = useState<Bid[]>()

  useEffect(() => {
    if (id) {
      fetchUser()
      fetchProducts()
      fetchWallet()
      fetchTransaction()
      fetchBid()
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

  const addMoney = async (amount: number) => {
    try {
      if (wallet) {
        const updatedWallet = await updateWalletBalance(wallet.userId, Number(wallet.balance) + Number(amount));
        setWallet(updatedWallet);
      } else if (user) {
        const newWallet = await createWallet(user.id, amount);
        setWallet(newWallet);
      }
    } catch (error) {
      console.error(error);
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

  const fetchBid = async () => {
    try {
      const bidData = await getOwnBids();
      setBidData(bidData)
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
            <div>
              <AddMoneyDropdown onAddMoney={addMoney} />
            </div>
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
                  <TableHead>Auction #</TableHead>
                  <TableHead>Your Bid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bidData && bidData.map(bids => (
                  <TableRow key={bids.id}>
                    <TableCell>{bids.auctionId}</TableCell>
                    <TableCell>{bids.bid}</TableCell>
                    <TableCell>{bids.status}</TableCell>
                    <TableCell>{new Date(bids.date_time).toLocaleDateString()}</TableCell>
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
