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

      res.status(200).json(auction)
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/auctions", async (req: Request, res: Response) => {
    try {
      const {
        date_ends,
        minimum_bid,
        status,
        productId,
        sellerId,
      } = req.body;

      const newAuction = await prisma.auction.create({
        data: {
          date_ends,
          minimum_bid,
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
      const { bids, status, minimum_bid } = req.body;

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
          minimum_bid,
        },
      });

      res.status(201).json(updateAuction);
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.delete("/api/auctions/product/:productId", async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
  
      const findAuction = await prisma.auction.findFirst({
        where: {
          productId: parseInt(productId),
        },
      });
  
      if (!findAuction) {
        return res.status(404).json({ message: "Auction not found for the product" });
      }
  
      await prisma.auction.deleteMany({
        where: {
          productId: parseInt(productId),
        },
      });
  
      res.status(202).json({ message: "Auction(s) deleted successfully" });
    } catch (error) {
      console.error('Error deleting auction(s):', error);
      res.status(500).json({ error: "Internal Server Error" });
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
        return res.status(404).json({ message: "Auction not found" });

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

  app.get("/api/product/:id/auctioned-products", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const auction = await prisma.auction.findMany({
        where: {
          productId: parseInt(id),
        },
      });
      if (!auction) return res.status(404).json({ message: "Auction not found" });
      res.status(200).json(auction);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

export default auctionsRoutes;