import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export function authenticateToken(token : string) : Promise<boolean> | boolean {

  jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (error, user) => {
    if (error) {
      console.log(error)
      return false
    }
  })
  
  return true
}