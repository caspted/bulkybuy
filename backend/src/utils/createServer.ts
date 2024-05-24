import express, { Express } from "express";
import cors from "cors";
import auctionsRoutes from "../routes/auctions";
import authRoutes from "../routes/auth";
import bidsRoutes from "../routes/bids";
import certificatesRoutes from "../routes/certificates";
import usersRoutes from "../routes/users";
import walletsRoutes from "../routes/wallets";
import productRoutes from "../routes/products";


function createServer() {
  const app: Express = express();
  app
    .use(cors())
    .use(express.json());
  auctionsRoutes(app);
  authRoutes(app);
  bidsRoutes(app);
  certificatesRoutes(app);
  usersRoutes(app);
  walletsRoutes(app);
  productRoutes(app)

  return app
}

export default createServer;
