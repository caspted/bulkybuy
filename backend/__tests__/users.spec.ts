import supertest from "supertest";
import createServer from "../src/utils/createServer";
import { prisma } from "../src/routes/users";

const app = createServer(); 

describe("given a couple of USERS in the database", () => {

  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  it("read or return all users", async () => {
    
    await prisma.user.createMany({
      data: [{
        name: "Matthew",
        email: "matthew@gmail.com",
        password: "1234"
      },
    {
      name: "Mykiell",
      email: "mykiell@gmail.com",
      password: "5789"
    },
    {
      name: "Teddie",
      email: "Teddie@gmail.com",
      password: "9876"
    }]
    })

    const response = await supertest(app).get("/api/user")

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(3)
  })

  it("read or return a single user", async () => {

    const singleUser = await prisma.user.create({
      data: {
        name: "Teddie",
        email: "teddiejohn@gmail.com",
        password: "4567",
        date_registered: new Date()
      }
    })

    const response = await supertest(app).get(`/api/user/${singleUser.id}`)

    expect(response.statusCode).toBe(200)
    const receivedUser = response.body;
    receivedUser.date_registered = new Date(receivedUser.date_registered);

    const expectedUser = {
      ...singleUser,
      date_registered: singleUser.date_registered,
    };
    expect(response.body).toMatchObject(expectedUser)

  })

  it("creates a new user", async () => {

    const newUser = {
      name: "Matthew",
      email: "matthewledesma@gmail.com",
      password: "2020",
    }

    const response = await supertest(app).post(`/api/user`).send(newUser)

    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject(newUser)
  })

  it("updates a user", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Myk",
        email: "myk@gmail.com",
        password: "4900"
      }
    })

    const updatedUser = {
      name: "Myk",
      email: "mykdeovenn@gmail.com",
      password: "4900"
    }

    const response = await supertest(app).put(`/api/user/${user.id}`).send(updatedUser)

    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject(updatedUser)
  })

  it("deletes a user", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Casper",
        email: "Iamghost@gmail.com",
        password: "Iamfriendly"
      }
    })

    const response = await supertest(app).delete(`/api/user/${user.id}`)

    expect(response.statusCode).toBe(202)
    expect(response.body).toMatchObject({ message: "User deleted successfully"})
  })

    // Failed cases

    it("fails to read a user that does not exist", async () => {
      const response = await supertest(app).get("/api/user/100")
  
      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject({ message: "User not found" })
    })
  
    it("fails to update a user that does not exist", async () => {
      const updatedUser = {
        name: "Nonexistent User",
        email: "nonexistent@gmail.com",
        password: "noexist"
      }
  
      const response = await supertest(app).put("/api/user/111").send(updatedUser)
  
      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject({ message: "User not found" })
    })
  
    it("fails to delete a user that does not exist", async () => {
      const response = await supertest(app).delete("/api/user/77")
  
      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject({ message: "User not found" })
    })
  
    it("fails to create a user with invalid data", async () => {
      const invalidUser = {
        name: "Invalid User",
      }
  
      const response = await supertest(app).post("/api/user").send(invalidUser)
  
      expect(response.statusCode).toBe(500)
      expect(response.body).toMatchObject({ error: "Internal Server Error" })
    })
  
})