import supertest from "supertest";
import createServer from "../src/utils/createServer";
import prisma from "../src/utils/prismaClient";

const app = createServer();

describe("given a couple of CERTIFICATES in the database", () => {

  afterEach(async () => {
    await prisma.certificate.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns a certificate by user ID", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Jane",
        email: "jane@gmail.com",
        password: "password123",
      },
    });

    const certificate = await prisma.certificate.create({
      data: {
        type: "Professional",
        image_url: "http://example.com/image.jpg",
        info: "Certified Professional",
        userId: user.id,
      },
    });

    const response = await supertest(app).get(`/api/certificate/${user.id}`).expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body.userId).toBe(user.id);
    expect(response.body.type).toBe(certificate.type);
  });

  it("creates a new certificate", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Jane",
        email: "jane@gmail.com",
        password: "password123",
      },
    });

    const newCertificate = {
      type: "Professional",
      image_url: "http://example.com/image.jpg",
      info: "Certified Professional",
      userId: user.id,
    };

    const response = await supertest(app).post(`/api/certificate/${user.id}`).send(newCertificate).expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.type).toBe(newCertificate.type);
    expect(response.body.userId).toBe(newCertificate.userId);
  });

  it("updates a certificate by ID", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Jane",
        email: "jane@gmail.com",
        password: "password123",
      },
    });

    const certificate = await prisma.certificate.create({
      data: {
        type: "Professional",
        image_url: "http://example.com/image.jpg",
        info: "Certified Professional",
        userId: user.id,
      },
    });

    const updatedInfo = {
      info: "Certified Expert",
    };

    const response = await supertest(app).put(`/api/certificate/${certificate.id}`).send(updatedInfo).expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.info).toBe(updatedInfo.info);
  });

  it("deletes a certificate by ID", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Jane",
        email: "jane@gmail.com",
        password: "password123",
      },
    });

    const certificate = await prisma.certificate.create({
      data: {
        type: "Professional",
        image_url: "http://example.com/image.jpg",
        info: "Certified Professional",
        userId: user.id,
      },
    });

    const response = await supertest(app).delete(`/api/certificates/${certificate.id}`).expect(202);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Certificate deleted successfully");
  });

  //Failed Test

  
  it("returns 404 if certificate not found", async () => {
    const nonExistentCertificateId = 999;

    const response = await supertest(app)
      .get(`/api/certificate/${nonExistentCertificateId}`)
      .expect(404);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Certificate not found");
  });
});
