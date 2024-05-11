import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default function refreshAccessToken(user: string) {
  const token = jwt.sign(user, process.env.JWT_REFRESH_SECRET as string)

  return token
}
