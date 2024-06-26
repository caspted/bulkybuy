import { Express, Request, Response } from "express";
import prisma from "../utils/prismaClient";

function usersRoutes(app: Express) {
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
      const { name, email, password, wallet, bids } = req.body;
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
          name,
          email,
          password,
          wallet,
          bids,
        },
      });

      res.status(201).json(updatedUser);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.delete("/api/user/email/:email", async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const findUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await prisma.user.delete({
        where: {
          email,
        },
      });
  
      res.status(202).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(502).json({ error: "Internal Server Error" });
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

   //User owned products
   app.get("/api/user/:userId/products", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params

      const userOwnedProducts = await prisma.product.findMany({
        where: {
          id: parseInt(userId)
        }
      })

      res.status(200).json(userOwnedProducts)
    } catch {
      res.status(500).json({ error: "Internal Server Error"})
    }
  })
}

export default usersRoutes;
