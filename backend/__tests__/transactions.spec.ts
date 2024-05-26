import supertest from "supertest";
import createServer from "../src/utils/createServer";
import prisma from "../src/utils/prismaClient";

const app = createServer();

describe("given a couple of TRANSACTIONS in the database", () => {

  beforeEach(async () => {
    await prisma.transaction.deleteMany();
    await prisma.wallet.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany();
    await prisma.wallet.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("reads or retrieves all transactions", async () => {
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

    console.log("User and Wallet created:", { user, wallet });

    await prisma.transaction.createMany({
      data: [
        {
          type: "credit",
          amount: 50.00,
          walletId: wallet.id
        },
        {
          type: "online",
          amount: 80.00,
          walletId: wallet.id
        }
      ]
    });

    const response = await supertest(app).get("/api/transactions");

    console.log("Transactions Response:", response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });



  it("retrieves a user's transaction", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John",
        email: "john@gmail.com",
        password: "tyehhgjj",
        date_registered: new Date()
      },
    });

    const wallet = await prisma.wallet.create({
      data: {
        balance: 100.00,
        userId: user.id
      }
    });

    const transaction = await prisma.transaction.create({
      data: {
        type: "credit",
        amount: 50.00,
        walletId: wallet.id
      }
    });

    const response = await supertest(app).get(`/api/transactions/${transaction.id}`);

    expect(response.statusCode).toBe(200);

    const receivedTransaction = response.body;
    receivedTransaction.date = new Date(receivedTransaction.date);

    const expectedTransaction = {
      ...transaction,
      date: transaction.date,
      amount: transaction.amount.toString(), 
    };

    expect(receivedTransaction).toMatchObject(expectedTransaction);
  });

  it("creates a new transaction", async () => {
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

    const newTransactionData = {
      type: "credit",
      amount: 50.00,
      wallet: {
        connect: { id: wallet.id }
      }
    };

    const response = await supertest(app)
      .post("/api/transactions")
      .send(newTransactionData)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.type).toBe(newTransactionData.type);
    expect(response.body.amount).toBe(newTransactionData.amount.toString());
    expect(response.body.walletId).toBe(wallet.id);
  });

  it("returns 500 if transaction creation fails", async () => {
    const newTransactionData = {
      type: "credit",
      amount: 50.00,
      wallet: {
        connect: { id: 999 }
      }
    };

    const response = await supertest(app)
      .post("/api/transactions")
      .send(newTransactionData)
      .expect(500);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Internal Server Error");
  });
});
