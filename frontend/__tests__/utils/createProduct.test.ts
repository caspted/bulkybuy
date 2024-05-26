import getUserInfo from "../../src/utils/getUserInfo";
import createProduct from "../../src/utils/createProduct";
import axios from "axios";

jest.mock("../../src/utils/getUserInfo");
jest.mock("axios");

global.fetch = jest.fn();

describe("createProduct", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // test("should create a new product when API response is successful", async () => {
  //   const mockSellerId = 123;
  //   const mockProductName = "New Product";
  //   const mockProductDescription = "This is a new product";
  //   const mockProductCategory = "Electronics";
  //   const mockImageFile = new File(["mock-image-data"], "mock-image.jpg", {
  //     type: "image/jpeg",
  //   });
  //   const mockImageUrl = "https://example.com/mock-image.jpg";

  //   // Mock the getUserInfo function
  //   (getUserInfo as jest.Mock).mockReturnValue({ id: mockSellerId.toString() });

  //   // Mock the axios.post response
  //   const mockAxiosResponse = { data: { imageName: mockImageUrl } };
  //   (axios.post as jest.Mock).mockResolvedValue(mockAxiosResponse);

  //   // Mock the fetch response
  //   const mockFetchResponse = { ok: true, status: 200 } as unknown as Response;
  //   (global.fetch as jest.Mock).mockResolvedValue(mockFetchResponse);

  //   await createProduct(
  //     mockProductName,
  //     mockProductDescription,
  //     mockProductCategory,
  //     mockImageFile
  //   );

  //   expect(axios.post).toHaveBeenCalledWith(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/image`,
  //     expect.any(FormData),
  //     { headers: { "Content-Type": "multipart/form-data" } }
  //   );

  //   expect(global.fetch).toHaveBeenCalledWith(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: mockProductName,
  //         description: mockProductDescription,
  //         category: mockProductCategory,
  //         sellerId: mockSellerId,
  //         image_url: mockImageUrl,
  //       }),
  //     }
  //   );
  // });

  test("should throw an error when API response is unsuccessful", async () => {
    const mockSellerId = 456;
    const mockProductName = "Error Product";
    const mockProductDescription = "This is an error product";
    const mockProductCategory = "Books";
    const mockImageFile = new File(["mock-image-data"], "mock-image.jpg", {
      type: "image/jpeg",
    });

    // Mock the getUserInfo function
    (getUserInfo as jest.Mock).mockReturnValue({ id: mockSellerId.toString() });

    // Mock the axios.post response
    const mockAxiosResponse = { data: { imageName: "mock-image.jpg" } };
    (axios.post as jest.Mock).mockResolvedValue(mockAxiosResponse);

    // Mock the fetch response with an error
    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(
      createProduct(
        mockProductName,
        mockProductDescription,
        mockProductCategory,
        mockImageFile
      )
    ).rejects.toThrow("Failed to create product");
  });
});