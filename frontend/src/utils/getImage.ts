export default async function getImage(name: string) : Promise<any> {
  console.log("name", name)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/image/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};