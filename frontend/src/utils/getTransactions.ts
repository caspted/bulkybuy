import getUserInfo from "./getUserInfo";
import { Transaction } from "./types";

export default async function getTransactions(): Promise<Transaction> {
  const userId = Number(getUserInfo().id)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) throw new Error("Failed to get transactions")

    const data = response.json();
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}