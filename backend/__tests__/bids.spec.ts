import supertest from 'supertest';
import createServer from '../src/utils/createServer';
import prisma from '../src/utils/prismaClient';

const app = createServer();

describe('given a couple BIDS in the database', () => {
  afterEach(async () => {
    await prisma.bid.deleteMany();
    await prisma.auction.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('returns all bids', async () => {
    const response = await supertest(app).get('/api/bids').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('returns a specific bid by ID', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Bond',
        email: 'jamesbond@gmail.com',
        password: 'shakennotstired',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Aston Martin Car',
        description: 'Buy 3 take 1',
        image_url: 'http://example.com/image.jpg',
        category: 'Automobile',
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

    const bid = await prisma.bid.create({
      data: {
        date_time: new Date(),
        bid: 100,
        userId: user.id,
        auctionId: auction.id,
        status: 'active',
      },
    });

    const response = await supertest(app).get(`/api/bids/${bid.id}`).expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toEqual(bid.id);
  });

  it('creates a new bid', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Teddie',
        email: 'caspted@yahoo.com',
        password: 'boohoo',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Tomatoes',
        description: '20 sacks of tomatoes',
        image_url: 'http://example.com/image.jpg',
        category: 'Food',
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

    const response = await supertest(app).post('/api/bids')
      .send({
        date_time: new Date(),
        bid: 100,
        userId: user.id,
        auctionId: auction.id,
        status: 'active',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(Number(response.body.bid)).toEqual(100);
  });

  it('updates a bid status by ID', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Mykiell',
        email: 'deovenn@gmail.com',
        password: 'password',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Tank',
        description: 'This is used to fill water',
        image_url: 'http://example.com/image.jpg',
        category: 'Hardware',
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

    const bid = await prisma.bid.create({
      data: {
        date_time: new Date(),
        bid: 100,
        userId: user.id,
        auctionId: auction.id,
        status: 'active',
      },
    });

    const response = await supertest(app).put(`/api/bids/${bid.id}`).send({ status: 'inactive' }).expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.status).toEqual('inactive');
  });

  it('deletes a bid by ID', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Matthew',
        email: 'matt@microsoft.com',
        password: '12375',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Samsung',
        description: 'This the S23 model',
        image_url: 'http://example.com/image.jpg',
        category: 'Tech/Gadget',
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

    const bid = await prisma.bid.create({
      data: {
        date_time: new Date(),
        bid: 100,
        userId: user.id,
        auctionId: auction.id,
        status: 'active',
      },
    });

    const response = await supertest(app).delete(`/api/bids/${bid.id}`).expect(202);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Bid deleted successfully');
  });


  //Failed Test

  it('fails to return a specific bid by invalid ID', async () => {

    const response = await supertest(app).get('/api/bids/777').expect(404);

    expect(response.body).toHaveProperty('message', 'Bid not found');
  });

  it('fails to create a bid with missing fields', async () => {
    const response = await supertest(app).post('/api/bids')
      .send({
        date_time: new Date(),
        bid: 100,
      })
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });

  it('fails to update a non-existent bid', async () => {
    const response = await supertest(app).put('/api/bids/222').send({ status: 'inactive' }).expect(404);

    expect(response.body).toHaveProperty('message', 'Bid not found');
  });

  it('fails to delete a non-existent bid', async () => {
    const response = await supertest(app)
      .delete('/api/bids/4000')
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Bid not found');
  });
});

