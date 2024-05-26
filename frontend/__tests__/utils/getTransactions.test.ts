import getUserInfo from "../../src/utils/getUserInfo";
import getTransactions from "../../src/utils/getTransactions";
import { Transaction } from "../../src/utils/types";

jest.mock("../../src/utils/getUserInfo");

global.fetch = jest.fn();

describe("getTransactions", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should return transactions when API response is successful", async () => {
    const mockUserId = 123;
    const mockTransactions: Transaction[] = [
      {
        id: 1,
        type: "DEPOSIT",
        amount: 1000,
        wallet: {
          id: 1,
          userId: mockUserId,
          balance: 1000,
        },
      },
      {
        id: 2,
        type: "WITHDRAWAL",
        amount: 500,
        wallet: {
          id: 1,
          userId: mockUserId,
          balance: 1000,
        },
      },
    ];

    // Mock the getUserInfo function
    (getUserInfo as jest.Mock).mockReturnValue({ id: mockUserId.toString() });

    // Mock the fetch response
    const mockResponse = {
      ok: true,
      json: async () => mockTransactions,
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getTransactions();

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions/${mockUserId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockTransactions);
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

    await expect(getTransactions()).rejects.toThrow("Failed to get transactions");
  });
});