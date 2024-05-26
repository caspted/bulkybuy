import getUserInfo from "../../src/utils/getUserInfo";
import getAuctionProducts from "../../src/utils/getAuctionProducts";
import { Product } from "../../src/utils/types";

jest.mock("../../src/utils/getUserInfo");

global.fetch = jest.fn();

describe("getAuctionProducts", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should return auction products data when API response is successful", async () => {
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

    // Mock the getUserInfo function
    (getUserInfo as jest.Mock).mockReturnValue({ id: mockSellerId.toString() });

    // Mock the fetch response
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockProducts,
    } as unknown as Response;

    // Spy on the global fetch function
    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAuctionProducts();

    expect(fetchSpy).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/auction/${mockSellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockProducts);
  });

  test("should throw an error when API response is unsuccessful", async () => {
    const mockSellerId = 456;

    // Mock the getUserInfo function
    (getUserInfo as jest.Mock).mockReturnValue({ id: mockSellerId.toString() });

    // Mock the fetch response with an error
    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => ({ message: "Failed to fetch auction products" }),
    } as unknown as Response;

    // Spy on the global fetch function
    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(getAuctionProducts()).rejects.toThrow("Failed to fetch auction products");
    expect(fetchSpy).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/auction/${mockSellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
});