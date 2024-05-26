import getUserInfo from "../../src/utils/getUserInfo";
import getWallet from "../../src/utils/getWallet";
import { Wallet } from "../../src/utils/types";

jest.mock("../../src/utils/getUserInfo");

global.fetch = jest.fn();

describe("getWallet", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should return the user's wallet when API response is successful", async () => {
    const mockUserId = 123;
    const mockWallet: Wallet = {
      id: 1,
      userId: mockUserId,
      balance: 1000,
    };

    // Mock the getUserInfo function
    (getUserInfo as jest.Mock).mockReturnValue({ id: mockUserId.toString() });

    // Mock the fetch response
    const mockResponse = {
      ok: true,
      json: async () => mockWallet,
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getWallet();

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/wallet/${mockUserId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockWallet);
  });

  test("should throw an error when API response is unsuccessful", async () => {
    const mockUserId = 456;

    // Mock the getUserInfo function
    (getUserInfo as jest.Mock).mockReturnValue({ id: mockUserId.toString() });

    // Mock the fetch response with an error
    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(getWallet()).rejects.toThrow("Failed to get user wallet");
  });
});