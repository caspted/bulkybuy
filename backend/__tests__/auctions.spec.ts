import supertest from 'supertest';
import createServer from '../src/utils/createServer';
import prisma from '../src/utils/prismaClient';

const app = createServer();

describe('given a couple of AUCTIONS in the database', () => {
  afterEach(async () => {
    await prisma.bid.deleteMany();
    await prisma.auction.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('returns all auctions', async () => {

    const response = await supertest(app).get('/api/auctions').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('returns a specific auction by ID', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'Dora',
        email: 'explorer@gmail.com',
        password: 'password123',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Map',
        description: 'A view of the world in paper',
        image_url: 'http://example.com/image.jpg',
        category: 'Tools',
        sellerId: user.id,
      },
    });

    const auction = await prisma.auction.create({
      data: {
        date_started: new Date(),
        date_ends: new Date(),
        minimum_bid: 50,
        sellerId: user.id,
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    const response = await supertest(app).get(`/api/auctions/${auction.id}`).expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toEqual(auction.id);
  });

  it('creates a new auction', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'George',
        email: 'jungle@yahoo.com',
        password: 'heheheheh',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Banana',
        description: 'A bunch of bananas',
        image_url: 'http://example.com/image.jpg',
        category: 'Food',
        sellerId: user.id,
      },
    });

    const response = await supertest(app).post('/api/auctions')
      .send({
        date_started: new Date(),
        date_ends: new Date(),
        minimum_bid: 50,
        sellerId: user.id,
        productId: product.id,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });


  it('updates an auction by ID', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'Jones',
        email: 'indiana@yahoo.com',
        password: 'holygrail',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Cups',
        description: 'Used for a variety of things',
        image_url: 'http://example.com/image.jpg',
        category: 'Needs',
        sellerId: user.id,
      },
    });

    const auction = await prisma.auction.create({
      data: {
        date_started: new Date(),
        date_ends: new Date(),
        minimum_bid: 50, 
        sellerId: user.id,
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });
  
    const response = await supertest(app).put(`/api/auctions/${auction.id}`).send({ minimum_bid: 100 }) .expect(201);
  
    expect(response.body).toHaveProperty('id');
    expect(Number(response.body.minimum_bid)).toEqual(100); 
  });

  it('deletes an auction by ID', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'Vader',
        email: 'padawankiller@gmail.com',
        password: 'Nowiamthemaster',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Lightsaber',
        description: 'Used to torch things',
        image_url: 'http://example.com/image.jpg',
        category: 'Tools',
        sellerId: user.id,
      },
    });

    const auction = await prisma.auction.create({
      data: {
        date_started: new Date(),
        date_ends: new Date(),
        minimum_bid: 50,
        sellerId: user.id,
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    const response = await supertest(app).delete(`/api/auctions/${auction.id}`).expect(202);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Auction deleted successfully');
  });

  //Failed Test

  it('fails to return a specific auction by invalid ID', async () => {

    const response = await supertest(app).get('/api/auctions/111').expect(404);

    expect(response.body).toHaveProperty('message', 'Auction not found');
  });

  it('fails to create an auction with missing fields', async () => {

    const response = await supertest(app).post('/api/auctions')
      .send({
        date_started: new Date(),
        date_ends: new Date(),
        minimum_bid: 50,
      })
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });


  it('fails to update a non-existent auction', async () => {

    const response = await supertest(app).put('/api/auctions/333').send({ minimum_bid: 100 }).expect(404);

    expect(response.body).toHaveProperty('message', 'Auction not found');
  });


  it('fails to delete a non-existent auction', async () => {

    const response = await supertest(app).delete('/api/auctions/222').expect(404);

    expect(response.body).toHaveProperty('message', 'Auction not found');
  });
});
