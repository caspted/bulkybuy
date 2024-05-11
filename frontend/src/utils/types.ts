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
}