import { Express, Request, Response } from "express";
import prisma from "../utils/prismaClient";

function bidsRoutes(app: Express) {
  //Bid API Routes
  app.get("/api/bids", async (req: Request, res: Response) => {
    try {
      const bids = await prisma.bid.findMany();
      res.status(200).json(bids);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/bids/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const bid = await prisma.bid.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!bid) return res.status(404).json({ message: "Bid not found" });

      res.status(200).json(bid);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/bids", async (req: Request, res: Response) => {
    try {
      const { date_time, bid, user, auction, status, userId, auctionId } =
        req.body;
      const newBid = await prisma.bid.create({
        data: {
          date_time,
          bid,
          user,
          auction,
          status,
          userId,
          auctionId,
        },
      });

      res.status(201).json(newBid);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.put("/api/bids/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const findBid = await prisma.bid.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!findBid) return res.status(404).json({ message: "Bid not found" });

      const updatedBid = await prisma.bid.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status,
        },
      });

      res.status(201).json(updatedBid);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.delete("/api/bids/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const findBid = await prisma.bid.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!findBid) return res.status(404).json({ message: "Bid not found" });

      await prisma.bid.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(202).json({ message: "Bid deleted successfully" });
    } catch {
      res.status(502).json({ error: "Internal Server Error" });
    }
  });
}

export default bidsRoutes;
