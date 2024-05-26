import getUserInfo from "./getUserInfo";
import { Product } from "./types";

export default async function getOwnProducts() : Promise<Product[]> {
  const sellerId = Number(getUserInfo().id)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/seller/${sellerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};