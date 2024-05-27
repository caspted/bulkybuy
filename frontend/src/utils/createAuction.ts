import getUserInfo from "./getUserInfo";
import axios from "axios";

export default async function createAuction (date_ends : Date, minimum_bid : number, productId: number) {
  const sellerId = getUserInfo().id
  const status = "Active"

  try {
    const formData = new FormData();

    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auctions`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auctions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date_ends,
        minimum_bid,
        status,
        productId,
        sellerId,
      }),
    });

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Failed to create product');
    }
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};