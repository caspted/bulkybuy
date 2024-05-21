// getProduct.test.ts
import getProduct from '../../src/utils/getProduct';
import { Product } from '../../src/utils/types';
import { Response } from 'node-fetch';

global.fetch = jest.fn();

describe('getProduct', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return product data when API response is successful', async () => {
    const mockProductId = 1;
    const mockProduct: Product = {
      id: mockProductId,
      name: 'Mock Product',
      description: 'This is a mock product',
      image_url: 'https://example.com/mock-product.jpg',
      listed_at: new Date('2023-05-01'),
      category: 'Electronics',
    };

    // Mock the fetch response
    const mockResponse = new Response(JSON.stringify(mockProduct), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    // Spy on the global fetch function
    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getProduct(mockProductId);

    expect(fetchSpy).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${mockProductId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    expect(result).toEqual(mockProduct);
  });

  test('should throw an error when API response is unsuccessful', async () => {
    const mockProductId = 2;

    // Mock the fetch response with an error
    const mockErrorResponse = new Response('Failed to fetch product', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    // Spy on the global fetch function
    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse)

    await expect(getProduct(mockProductId)).rejects.toThrow(
      'Failed to fetch product'
    );

    expect(fetchSpy).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${mockProductId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });
});