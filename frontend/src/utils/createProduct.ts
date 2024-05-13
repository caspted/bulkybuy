import getUserInfo from "./getUserInfo";

export default async function createProduct (name : string, description : string, category : string, imageUrl? : string) {
  const sellerId = getUserInfo().id
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        category,
        sellerId,
        image_url: imageUrl ? "" : imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};