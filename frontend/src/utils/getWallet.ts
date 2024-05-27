import getUserInfo from "./getUserInfo";
import { Wallet } from "./types";

export default async function getWallet(): Promise<Wallet> {
  const userInfo = getUserInfo();

  const userId = userInfo.id;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/wallets/${userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get user wallet`);
    }

    const data: Wallet = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
}
