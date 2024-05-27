import getProduct from '../../src/utils/getProduct';
import { Product } from '../../src/utils/types';

global.fetch = jest.fn();

describe('getProduct', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('return product data; successful response', async () => {
    const mockProductId = 1;
    const mockProduct: Product = {
      id: mockProductId,
      name: 'Mock Product',
      description: 'This is a mock product',
      image_url: 'https://example.com/mock-product.jpg',
      listed_at: new Date('2023-05-01'),
      category: 'Electronics',
      sold: true,
    };

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockProduct,
    } as unknown as Response;

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

  it('throw error; unsuccessful response', async () => {
    const mockProductId = 2;

    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({ message: 'Failed to fetch product' }),
    } as unknown as Response;

    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(getProduct(mockProductId)).rejects.toThrow('Failed to fetch product');

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
