import * as dotenv from "dotenv";
import createServer from "./utils/createServer";

dotenv.config({ path: ".env" });

const port = process.env.PORT
const app = createServer();

app.listen(port , () => {
  console.log(`[SERVER]: is running at https://localhost:${port}`)
})