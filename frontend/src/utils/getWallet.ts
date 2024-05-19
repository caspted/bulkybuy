import getUserInfo from "./getUserInfo";
import { Wallet } from "./types";

export default async function getWallet(): Promise<Wallet> {
  const  userId  = Number(getUserInfo().id)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/wallet/${userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response) throw new Error('Failed to get user wallet');

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}