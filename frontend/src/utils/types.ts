export type User = {
  id: number,
  name: string,
  email: string,
  password: string,
  date_registered: Date
}

export type Product = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  listed_at: Date;
  category: string;
  fetchUrl?: string;
  sold: boolean;
}

export type Wallet = {
  id: number;
  userId: number;
  balance: number;
}

export type Transaction = {
  id: number,
  type: string,
  amount: number,
  wallet: Wallet
}

export type Auction = {
  id: number;
  date_started: Date;
  date_ends: Date;
  minimum_bid: number;
  bids: number;
  status: string;
  productId: number;
  sellerId: number;
}

export type Bid = {
  id: number;
  date_time: Date;
  bid: number;
  status: string;
  userId: number;
  auctionId: number;
}