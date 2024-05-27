import getUserInfo from "./getUserInfo";

export default async function createBid (bid : number, auctionId: number) {
  const userId = getUserInfo().id
  const status = "Active"

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bid,
        status,
        userId,
        auctionId,
      }),
    });

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Failed to create bid');
    }
  } catch (error) {
    console.error('Error creating bid:', error);
    throw error;
  }
};