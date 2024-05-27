import { Express, Request, Response } from "express";
import prisma from "../utils/prismaClient";

function walletsRoutes(app: Express) {
  //Wallet API Routes
  app.get("/wallets/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const wallet = await prisma.wallet.findFirst({
        where: {
          userId: parseInt(userId),
        },
      });

      if (!wallet) return res.status(404).json({ message: "Wallet Not Found" });
      res.status(200).json(wallet);
    } catch {
      res.status(200).json({ error: "Internal Server Error" });
    }
  });

   app.post("/api/wallets", async (req: Request, res: Response) => {
    try {
      const { balance, userId } = req.body;

      const newWallet = await prisma.wallet.create({
        data: {
          balance,
          userId,
        },
      });

      res.status(201).json(newWallet);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.put("/api/wallets/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { balance } = req.body;

      const findWallet = await prisma.wallet.findUnique({
        where: {
          userId: parseInt(userId)
        }
      })

      if (!findWallet) return res.status(404).json({ message: "Wallet Not Found"})

      const updatedWalletBalance = await prisma.wallet.update({
        where: {
          userId: parseInt(userId)
        },
        data: {
          balance: parseFloat(balance)
        }
      })

      res.status(201).json(updatedWalletBalance)
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
}

export default walletsRoutes;
