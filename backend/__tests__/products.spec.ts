import supertest from "supertest";
import createServer from "../src/utils/createServer";
import prisma from "../src/utils/prismaClient";

const app = createServer()

describe("given a couple of PRODUCTS in the database", () => {

  beforeEach(async () => {
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: [{ 
          id: 1, 
          name: 'User 1', 
          email: 'user1@example.com', 
          password: 'password1' 
        },
        { 
          id: 2, 
          name: 'User 2', 
          email: 'user2@example.com', 
          password: 'password2' }
        ]
    });
  });

  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("read or retrieves all products", async () => {
    await prisma.product.createMany({ 
      data: [{ 
        name: "Iphone", 
        description: "It is apple", 
        category: "Gadgets", 
        sellerId: 1,
        image_url: ""
    },
      { 
        name: "Watermelon", 
        description: "This is edible", 
        category: "Food", 
        sellerId: 1,
        image_url: ""
      },
    ]});

    const response = await supertest(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("retrieves products by a specific seller", async () => {
    await prisma.product.createMany({ 
      data: [{ 
        name: "Iphone", 
        description: "It is apple", 
        category: "Gadgets", 
        sellerId: 1,
        image_url: ""
    },
      { 
        name: "Watermelon", 
        description: "This is edible", 
        category: "Food", 
        sellerId: 1,
        image_url: ""
      },
    ]});

    const response = await supertest(app).get("/api/products/seller/1");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].sellerId).toBe(1);
  });

  it("should retrieve a single product by ID", async () => {
    const product = await prisma.product.create({
      data: { 
        name: "Rice", 
        description: "We will sack", 
        category: "Material", 
        sellerId: 1,
        image_url: ""
      },
    });

    const response = await supertest(app).get(`/api/products/${product.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(product.id);
  });

  it("should create a new product", async () => {
    const newProduct = { 
      name: "Sugar", 
      description: "It is white", 
      image_url: "something", 
      category: "Staples", 
      sellerId: 1
    };

    const response = await supertest(app).post("/api/products").send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newProduct);
  });

  it("should update an existing product", async () => {
    const product = await prisma.product.create({
      data: { 
        name: "Rice", 
        description: "We will sack", 
        category: "Material", 
        sellerId: 1,
        image_url: ""
      },
    });

    const updatedProduct = { name: "Black Rice", description: "Contains less sugar content", category: "Material" };

    const response = await supertest(app).put(`/api/products/${product.id}`).send(updatedProduct);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(updatedProduct);
  });

  it("deletes a product by ID", async () => {
    const product = await prisma.product.create({
      data: { 
        name: "Rice", 
        description: "We will sack", 
        category: "Material", 
        sellerId: 1,
        image_url: "" 
      },
    });

    const response = await supertest(app).delete(`/api/products/${product.id}`);

    expect(response.status).toBe(202);
    expect(response.body).toMatchObject({ message: "Product deleted successfully" });
  });


  // Failed cases

  it("should return 404 for non-existent product", async () => {
    const response = await supertest(app).get("/api/products/9999");

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ message: "Product not found" });
  });

  it("should return 404 when updating a non-existent product", async () => {
    const updatedProduct = { name: "Black Rice", description: "Contains less sugar content", category: "Material" };

    const response = await supertest(app).put("/api/products/9999").send(updatedProduct);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ message: "Product not found" });
  });

  it("should return 404 when deleting a non-existent product", async () => {
    const response = await supertest(app).delete("/api/products/9999");

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ message: "Product Not Found" });
  });

  it("should return 400 for invalid image upload request", async () => {
    const response = await supertest(app).post("/api/products/image");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'Image file is required' });
  });

  it("should return 400 for missing image name parameter", async () => {
    const response = await supertest(app).get("/api/products/image/");

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({ error: "Internal Server Error" });
  });

});