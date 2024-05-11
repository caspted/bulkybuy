import express from "express";
import cors from "cors";
import routes from "./routes";
import auctionsRoutes from "./routes/auctions";
import authRoutes from "./routes/auth";
import bidsRoutes from "./routes/bids";
import certificatesRoutes from "./routes/certificates";
import usersRoutes from "./routes/users";
import walletsRoutes from "./routes/wallets";

import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

async function startServer() {
  app
    .use(cors())
    .use(express.json());
  auctionsRoutes(app);
  authRoutes(app);
  bidsRoutes(app);
  certificatesRoutes(app);
  usersRoutes(app);
  walletsRoutes(app);

  app.listen(8080, () => {
    console.log("Server has started at PORT 8080");
  });
}

startServer();
