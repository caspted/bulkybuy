import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

function walletsRoutes(app: Express) {
  //Wallet API Routes
  app.get("/wallets/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const wallet = await prisma.wallet.findUnique({
        where: {
          id: parseInt(userId),
        },
      });

      if (!wallet) return res.status(404).json({ message: "Wallet Not found" });
      res.status(200).json(wallet);
    } catch {
      res.status(200).json({ error: "Internal Server Error" });
    }
  });

  app.post(
    "/api/wallets/:userId/transactions",
    async (req: Request, res: Response) => {
      try {
        const { balance, userId, user, transactions } = req.body;

        const newTransaction = await prisma.wallet.create({
          data: {
            balance,
            userId,
            user,
            transactions,
          },
        });

        res.status(201).json(newTransaction);
      } catch {
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  );

}

export default walletsRoutes;
