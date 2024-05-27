import getUserInfo from "./getUserInfo";

export default async function createAuction (date_ends : Date, minimum_bid : number, productId: number) {
  const sellerId = getUserInfo().id
  const status = "Active"

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auctions`, {
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
      throw new Error('Failed to create auction');
    }
  } catch (error) {
    console.error('Error creating auction:', error);
    throw error;
  }
};