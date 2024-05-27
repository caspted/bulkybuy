import { Wallet } from "@/utils/types";

export const createWallet = async (userId: number, initialBalance: number): Promise<Wallet> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wallets`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, balance: initialBalance }),
    });

    if (!response.ok) {
      throw new Error('Failed to create wallet');
    }

    const data: Wallet = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};
