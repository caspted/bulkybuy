import express from "express";
import cors from "cors";
import routes from "./routes";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

async function startServer() {
  app.use(cors()).use(express.json());

  routes(app);

  app.listen(8080, () => {
    console.log("Server has started at PORT 8080");
  });
}

startServer();
