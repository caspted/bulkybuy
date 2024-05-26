import supertest from 'supertest';
import createServer from '../src/utils/createServer';
import prisma from '../src/utils/prismaClient';
import { hash } from 'bcrypt';
import generateAccessToken from '../src/utils/generateAccessToken';

const app = createServer();

describe('Authentication Routes', () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('logs in an existing user', async () => {
    const password = await hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        name: 'Jade',
        email: 'jade@example.com',
        password,
      },
    });

    const response = await supertest(app).post('/api/login').send({ email: 'jade@example.com', password: 'password123' }).expect(200);

    expect(response.body).toHaveProperty('body.token');
    const decodedToken: any = generateAccessToken({ email: user.email, id: user.id });
    expect(response.body.body.token).toEqual(decodedToken);
  });

  it('registers a new user', async () => {

    const response = await supertest(app).post('/api/register').send({ userName: 'Jade', email: 'jade@example.com', password: 'password123' }).expect(201);

    expect(response.body).toHaveProperty('body.token');
    const user = await prisma.user.findUnique({ where: { email: 'jade@example.com' } });

    if (user) {
        const decodedToken: any = generateAccessToken({ email: user.email, id: user.id });
        expect(response.body.body.token).toEqual(decodedToken);
    } else {
        throw new Error("User not found");
    }
});


  //Failed Test

  it('returns 401 for incorrect email or password during login', async () => {
    await prisma.user.create({
      data: {
        name: 'Jade',
        email: 'jade@example.com',
        password: await hash('password123', 10),
      },
    });

    const response = await supertest(app).post('/api/login').send({ email: 'jade@example.com', password: 'wrongpassword' }).expect(401);

    expect(response.body).toEqual({ message: 'Email or password is incorrect' });
  });

  it('returns 409 for already existing email during registration', async () => {
    await prisma.user.create({
      data: {
        name: 'Jade',
        email: 'jade@example.com',
        password: await hash('password123', 10),
      },
    });

    const response = await supertest(app).post('/api/register').send({ userName: 'Jane', email: 'jade@example.com', password: 'password456' }).expect(409);

    expect(response.body).toEqual({ message: 'Email already in use' });
  });
});
