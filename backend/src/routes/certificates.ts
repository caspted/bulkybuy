import { Express, Request, Response } from "express";
import prisma from "../utils/prismaClient";

function certificatesRoutes(app: Express) {
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
}

export default certificatesRoutes;
