import getUserInfo from "./getUserInfo";
import axios from "axios";

export default async function createProduct (name : string, description : string, category : string, image: File | null) {
  const sellerId = getUserInfo().id

  if (!image) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const imageUrl = response.data.imageName

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`, {
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

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Failed to create product');
    }
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};