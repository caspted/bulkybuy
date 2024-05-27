import getUserInfo from "../../src/utils/getUserInfo";
import getWallet from "../../src/utils/getWallet";
import { Wallet } from "../../src/utils/types";

jest.mock("../../src/utils/getUserInfo");

global.fetch = jest.fn();

describe("getWallet", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("successful response", async () => {
    const mockUserId = 123;
    const mockWallet: Wallet = {
      id: 1,
      userId: mockUserId,
      balance: 1000,
    };

    (getUserInfo as jest.Mock).mockReturnValue({ id: mockUserId.toString() });

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

  it("unsuccessful response", async () => {
    const mockUserId = 456;
    (getUserInfo as jest.Mock).mockReturnValue({ id: mockUserId.toString() });

    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(getWallet()).rejects.toThrow("Failed to get user wallet");
  });
});