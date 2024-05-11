import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from 'bcrypt';
import generateAccessToken from '../utils/generateAccessToken';

export const prisma = new PrismaClient();

function authRoutes(app: Express) {
  app.post('/api/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }
  
      const isPasswordCorrect = await compare(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }
  
      const token = generateAccessToken({ email, id: user.id });
      res.status(200).json({ body: { token } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/api/register', async (req: Request, res: Response) => {
    const { userName, email, password } = req.body;

    console.log("lol")
  
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }
  
      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name: userName,
          email,
          password: hashedPassword,
        },
      });
  
      const token = generateAccessToken({ email: user.email, id: user.id });
      res.status(201).json({ body: { token } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register' });
    }
  });
}

export default authRoutes;