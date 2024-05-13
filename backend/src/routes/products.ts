import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

function productRoutes(app: Express) {
  // Product API Routes
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/products/seller/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findMany({
        where: { sellerId: parseInt(id) },
      });
      console.log(product)
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const { name, description, image_url, category, sellerId } = req.body;
      console.log(image_url)
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          image_url,
          category,
          sellerId,
        },
      });
      res.status(201).json(newProduct);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.put("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, image_url, category } = req.body;
      const findProduct = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!findProduct) return res.status(404).json({ message: "Product not found" });
      const updateProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          image_url,
          category,
        },
      });
      res.status(201).json(updateProduct);
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const findProduct = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!findProduct) return res.status(404).json({ message: "Product Not Found" });
      await prisma.product.delete({ where: { id: parseInt(id) } });
      res.status(202).json({ message: "Product deleted successfully" });
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

export default productRoutes;