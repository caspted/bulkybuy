import supertest from "supertest";
import createServer from "../src/utils/createServer";
import prisma from "../src/utils/prismaClient";

const app = createServer();

describe("given a couple of WALLETS in the database", () => {

  afterEach(async () => {
    await prisma.wallet.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns a wallet", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John",
        email: "john@gmail.com",
        password: "tyehhgjj"
      },
    });

    const wallet = await prisma.wallet.create({
      data: {
        balance: 100.00,
        userId: user.id
      }
    });

    const response = await supertest(app).get(`/wallets/${user.id}`).expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body.userId).toBe(user.id);
    expect(response.body.balance).toBe(wallet.balance.toString());
  });

  it("creates a new wallet", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John",
        email: "john@gmail.com",
        password: "tyehhgjj",
      },
    });

    const newWallet = {
      balance: 100.0,
      userId: user.id,
    };

    const response = await supertest(app).post(`/api/wallets`).send(newWallet).expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.balance).toBe(newWallet.balance.toString());
    expect(response.body.userId).toBe(newWallet.userId);
  });

  it("updates wallet balance", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John",
        email: "john@gmail.com",
        password: "tyehhgjj"
      },
    });

    const initialBalance = 100.00;

    const wallet = await prisma.wallet.create({
      data: {
        balance: initialBalance,
        userId: user.id
      }
    });

    const updatedBalance = 200.00;

    const response = await supertest(app).put(`/api/wallets/${user.id}`).send({ balance: updatedBalance }).expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.userId).toBe(user.id);
    expect(response.body.balance).toBe(updatedBalance.toString());

    const updatedWallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
    expect(Number(updatedWallet?.balance)).toBe(updatedBalance);
  });

  //Failed Test

  it("returns 404 if wallet not found", async () => {
    const nonExistentUserId = 999;

    const response = await supertest(app).get(`/wallets/${nonExistentUserId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Wallet Not Found");
  });

  it("fails to update wallet balance if user ID does not exist", async () => {
    const nonExistentUserId = 560; 

    const updatedBalance = 200.00;

    const response = await supertest(app).put(`/api/wallets/${nonExistentUserId}`).send({ balance: updatedBalance }).expect(404);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Wallet Not Found");

    const existingWallet = await prisma.wallet.findUnique({ where: { userId: nonExistentUserId } });
    expect(existingWallet).toBeNull();
  });

});
