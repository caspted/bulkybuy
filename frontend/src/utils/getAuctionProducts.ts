import getUserInfo from "./getUserInfo";
import { Product } from "./types";

export default async function getAuctionProducts() : Promise<Product[]> {
  const sellerId = Number(getUserInfo().id)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/auction/${sellerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch auction products');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Failed to fetch auction products:', error);
    throw error;
  }
};