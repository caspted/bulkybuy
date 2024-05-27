import { Wallet } from "@/utils/types";

export const updateWalletBalance = async (userId: number, amount: number): Promise<Wallet> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wallets/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ balance: amount }),
    });

    if (!response.ok) {
      throw new Error("Failed to update wallet balance");
    }

    const data: Wallet = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating wallet balance:", error);
    throw error;
  }
};
