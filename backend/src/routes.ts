import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

function routes(app: Express) {
  //User Api Routes
  app.get("/api/user", async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/user/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json(user);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/user", async (req: Request, res: Response) => {
    try {
      const { name, email, password, date_registered, wallet } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          date_registered,
          wallet,
        },
      });

      res.status(201).json(newUser);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.put("/api/user/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { wallet, bids } = req.body;
      const findUser = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!findUser) return res.status(404).json({ message: "User not found" });

      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          wallet,
          bids,
        },
      });

      res.status(201).json(updatedUser);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.delete("/api/user/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const findUser = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!findUser) return res.status(404).json({ message: "User not found" });

      await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(202).json({ message: "User deleted successfully" });
    } catch {
      res.status(502).json({ error: "Internal Server Error" });
    }
  });

  //Auction API Routes
  app.get("/api/auctions", async (req: Request, res: Response) => {
    try {
      const auctions = await prisma.auction.findMany();
      res.status(200).json(auctions);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/auctions/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const auction = await prisma.auction.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!auction)
        return res.status(404).json({ message: "Auction not found" });
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/auctions", async (req: Request, res: Response) => {
    try {
      const {
        product,
        date_started,
        date_ends,
        minimum_bid,
        bids,
        status,
        productId,
        sellerId,
      } = req.body;

      const newAuction = await prisma.auction.create({
        data: {
          product,
          date_started,
          date_ends,
          minimum_bid,
          bids,
          status,
          productId,
          sellerId,
        },
      });

      res.status(201).json(newAuction);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.put("/api/auctions/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { bids, status } = req.body;

      const findAuction = await prisma.auction.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!findAuction)
        return res.status(404).json({ message: "Auction not found" });

      const updateAuction = await prisma.auction.update({
        where: {
          id: parseInt(id),
        },
        data: {
          bids,
          status,
        },
      });

      res.status(201).json(updateAuction);
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.delete("/api/auctions/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const findAuction = await prisma.auction.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!findAuction)
        return res.status(404).json({ message: "Auction Not Found" });

      await prisma.auction.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(202).json({ message: "Auction deleted successfully" });
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //Certificate API Routes
  app.get("/api/certificate/userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const findCertificate = await prisma.certificate.findUnique({
        where: {
          id: parseInt(userId),
        },
      });

      res.status(200).json(findCertificate);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/certificate/userId", async (req: Request, res: Response) => {
    try {
      const { type, image_url, info, user, userId } = req.body;

      const newCertificate = await prisma.certificate.create({
        data: {
          type,
          image_url,
          info,
          user,
          userId,
        },
      });

      res.status(200).json(newCertificate);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.put("/api/certificate/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { info } = req.body;

      const findCertificate = await prisma.certificate.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!findCertificate)
        return res.status(404).json({ message: "Certificate not found" });

      const updatedCertificate = await prisma.certificate.update({
        where: {
          id: parseInt(id),
        },
        data: {
          info,
        },
      });

      res.status(201).json(updatedCertificate);
    } catch {
      res.status(500).json({ error: "Internal Service Error" });
    }
  });

  app.delete("/api/certificates/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const findCertificate = await prisma.certificate.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!findCertificate)
        return res.status(404).json({ message: "Certificate not found" });

      await prisma.certificate.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch {
      res.status(502).json("Certificate deleted successfully");
    }
  });

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

        res.status(200).json(newTransaction);
      } catch {
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  );
}

export default routes;
