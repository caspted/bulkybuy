import getUserInfo from "../../src/utils/getUserInfo";
import createProduct from "../../src/utils/createProduct";
import axios from "axios";

jest.mock('axios');
jest.mock('../../src/utils/getUserInfo', () => ({
  __esModule: true,
  default: () => ({ id: 'mockSellerId' }),
}));

global.fetch = jest.fn();

describe('createProduct', () => {
  const mockFormData = new FormData();
  mockFormData.append('image', 'mockImage' as unknown as Blob);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create a product without image', async () => {
    const mockResponse = { status: 200 };
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse as any);

    await createProduct('Product Name', 'Product Description', 'Category', null);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Product Name',
          description: 'Product Description',
          category: 'Category',
          sellerId: 'mockSellerId',
          image_url: '',
        }),
      }
    );
  });

  it('throw an error; creating a product with an image fails', async () => {
    const mockImageResponse = { data: { imageName: 'mockImageUrl' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockImageResponse);

    const mockFetchResponse = { status: 400 };
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockFetchResponse as any);

    await expect(createProduct('Product Name', 'Product Description', 'Category', mockFormData as unknown as File)).rejects.toThrow('Failed to create product');

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Product Name',
          description: 'Product Description',
          category: 'Category',
          sellerId: 'mockSellerId',
          image_url: 'mockImageUrl',
        }),
      }
    );
  });

  it('throw an error when creating a product without image fails', async () => {
    const mockFetchResponse = { status: 400 };
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockFetchResponse as any);

    await expect(createProduct('Product Name', 'Product Description', 'Category', null)).rejects.toThrow('Failed to create product');

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Product Name',
          description: 'Product Description',
          category: 'Category',
          sellerId: 'mockSellerId',
          image_url: '',
        }),
      }
    );
  });
});