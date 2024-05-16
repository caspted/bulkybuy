import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import sharp from "sharp";
import crypto from "crypto";
import { uploadFile, deleteFile, getObjectSignedUrl } from "../utils/s3Bucket";
const prisma = new PrismaClient();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

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

  app.post("/api/products", upload.single("image"), async (req: Request, res: Response) => {
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

  app.post("/api/products/image", upload.single("image"), async (req: Request, res: Response) => {
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }
  
      if (req.file.size > MAX_IMAGE_SIZE) {
        return res.status(413).json({ error: 'Image file is too large' });
      }

      const imageName = generateFileName();
      const fileBuffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: 'contain' })
        .toBuffer();
  
      await uploadFile(fileBuffer, imageName, req.file.mimetype);
  
      res.status(201).json({imageName});
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/products/image/:name", async (req, res) => {
    try {
      const { name } = req.params;
      console.log("name", name)
  
      if (!name) {
        return res.status(400).json({ error: "Missing 'name' parameter" });
      }
  
      const imageUrl = await getObjectSignedUrl(name);
  
      if (!isValidUrl(imageUrl)) {
        return res.status(500).json({ error: "Failed to generate signed URL" });
      }
  
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error("Error fetching signed URL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  function isValidUrl(url : string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

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