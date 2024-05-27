import { Express, Request, Response } from "express";
import prisma from "../utils/prismaClient";

function transactionRoutes(app: Express) {
  
  app.get("/api/transactions", async (req: Request, res: Response) => {
    try {
      const transactions = await prisma.transaction.findMany()
      if (!transactions) return res.status(404).json({ message: "There are no trasanctions made"})
      return res.status(200).json(transactions)
    } catch {
      return res.status(500).json({ error: "Internat Server Error"})
    }
  })

  app.get("/api/transactions/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      const userTransaction = await prisma.transaction.findUnique({
        where: {
          id: parseInt(userId)
        }
      })

      if (!userTransaction) return res.status(404).json( { message: "Transaction not found"})

      return res.status(200).json(userTransaction)
    } catch {
      return res.status(500).json({ error: "Internal Server Error"})
    }
  })

  app.post("/api/transactions", async (req: Request, res: Response) => {
    try {
      const { type, amount, wallet } = req.body
      const newTransaction = await prisma.transaction.create({
        data: {
          type,
          amount,
          wallet
        }
      })

      return res.status(201).json(newTransaction)
    } catch {
      return res.status(500).json({ error: "Internal Server Error"})
    }
  })
}

export default transactionRoutes;