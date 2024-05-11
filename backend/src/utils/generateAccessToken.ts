import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

interface Payload {
  email: string,
  id: number
}

export default function generateAccessToken(payload : Payload) {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string)
  return token
}