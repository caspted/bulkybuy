import getUserInfo from "../../src/utils/getUserInfo";
import getUser from "../../src/utils/getUser";
import { User } from "../../src/utils/types";

jest.mock("../../src/utils/getUserInfo");

global.fetch = jest.fn();

describe("getUser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("return user data; successful response", async () => {
    const mockUserId = 123;
    const mockUser: User = {
      id: mockUserId,
      name: "John Doe",
      email: "john.doe@example.com",
      date_registered: new Date("2023-05-01"),
      password: "encryptedpassword"
    };

    (getUserInfo as jest.Mock).mockReturnValue({ id: mockUserId.toString() });

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockUser,
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getUser();

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${mockUserId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockUser);
  });

  it("throw error; unsuccessful response", async () => {
    const mockUserId = 456;

    (getUserInfo as jest.Mock).mockReturnValue({ id: mockUserId.toString() });

    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(getUser()).rejects.toThrow("Failed to get user");
  });
});