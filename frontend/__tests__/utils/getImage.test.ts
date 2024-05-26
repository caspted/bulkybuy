import getImage from "../../src/utils/getImage";

global.fetch = jest.fn();

describe("getImage", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should return image data when API response is successful", async () => {
    const mockImageName = "example.jpg";
    const mockImageData = { /* mock image data object */ };

    // Mock the fetch response
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockImageData,
    } as unknown as Response;

    // Spy on the global fetch function
    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getImage(mockImageName);

    expect(fetchSpy).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/image/${mockImageName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockImageData);
  });

  test("should throw an error when API response is unsuccessful", async () => {
    const mockImageName = "error.jpg";

    // Mock the fetch response with an error
    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => ({ message: "Failed to fetch image" }),
    } as unknown as Response;

    // Spy on the global fetch function
    const fetchSpy = (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(getImage(mockImageName)).rejects.toThrow("Failed to fetch image");
    expect(fetchSpy).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/image/${mockImageName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
});