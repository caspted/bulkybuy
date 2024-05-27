import getUserInfo from "../../src/utils/getUserInfo";
import getOwnProducts from "../../src/utils/getOwnProducts";
import { Product } from "../../src/utils/types";

jest.mock("../../src/utils/getUserInfo");

global.fetch = jest.fn();

describe("getOwnProducts", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("return own products; successful response", async () => {
    const mockSellerId = 123;
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Product 1",
        description: "This is product 1",
        image_url: "https://example.com/product1.jpg",
        listed_at: new Date("2023-05-01"),
        category: "Electronics",
        sold: false,
      },
      {
        id: 2,
        name: "Product 2",
        description: "This is product 2",
        image_url: "https://example.com/product2.jpg",
        listed_at: new Date("2023-05-10"),
        category: "Books",
        sold: true,
      },
    ];

    (getUserInfo as jest.Mock).mockReturnValue({ id: mockSellerId.toString() });

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockProducts,
    } as unknown as Response;

    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getOwnProducts();

    expect(fetchSpy).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/seller/${mockSellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockProducts);
  });

  it("throw error; unsuccessful response", async () => {
    const mockSellerId = 456;

    (getUserInfo as jest.Mock).mockReturnValue({ id: mockSellerId.toString() });

    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => ({ message: "Failed to fetch products" }),
    } as unknown as Response;

    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(getOwnProducts()).rejects.toThrow("Failed to fetch products");
    expect(fetchSpy).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/seller/${mockSellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
});