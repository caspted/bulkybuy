"use client";
import { useState, useEffect, FC } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell, TableRow, TableHeader, TableHead, TableBody } from "@/components/ui/table";


export default function UserProfile() {
  const [user, setUser] = useState<string>("")
  const [product, setProduct] = useState<string>("")
  const [wallet, setWallet] = useState()

  return (
    <div className="flex flex-row space-x-4 mx-4">
      <div className="flex w-1/3 mt-8">
      <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Company Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h1>Email</h1>
          </div>
          <div>
            <h1>Date_Registered</h1>
          </div>
        </CardContent>
      </Card>
    </div>
      </div>
      <div className="flex flex-col w-2/3 mt-8 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Wallet Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h1>Balance: $5500</h1>
            </div>
            <div>
              <h1>Latest Transaction: $1000</h1>
            </div>
          </CardContent>
        </Card>
        <Card className="">
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
                  <TableHead>Image</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Apple Inc.</TableCell>
                  <TableCell>All new M4 chip</TableCell>
                  <TableCell>Iphone 15</TableCell>
                  <TableCell>Gadgets</TableCell>
                  <TableCell>Sold</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ikea</TableCell>
                  <TableCell>Real leather found in the Swiss</TableCell>
                  <TableCell>Green Leather Sofa</TableCell>
                  <TableCell>Furniture</TableCell>
                  <TableCell>Not Sold</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rice Mill Corporation</TableCell>
                  <TableCell>Premium jasmine rice</TableCell>
                  <TableCell>500 sacks of rice</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>Not Sold</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Steel Warrior Shop</TableCell>
                  <TableCell>Strongest steels in the east</TableCell>
                  <TableCell>1K bars of steel</TableCell>
                  <TableCell>Materials</TableCell>
                  <TableCell>Sold</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}