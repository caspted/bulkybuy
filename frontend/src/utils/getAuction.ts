import { Auction } from "./types";

export default async function getAuction(productId: number) : Promise<Auction[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/${productId}/auctioned-products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch auction');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching auction:', error);
    throw error;
  }
};