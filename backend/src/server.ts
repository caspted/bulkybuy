import express from "express";
import cors from "cors";
import { Pool } from 'pg';
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

const connectionString = process.env.DATABASE_URL

export const pool = new Pool({
  connectionString: connectionString,
});

async function startServer() {

  app
    .use(cors())
    .use(express.json())
    .listen(8080, () => {
      console.log("Server has started at PORT 8080");
    });
}

startServer();