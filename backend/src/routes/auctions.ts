import { Express, Request, Response } from "express";
import prisma from "../utils/prismaClient";

function auctionsRoutes(app: Express) {
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
  })
}

export default auctionsRoutes;