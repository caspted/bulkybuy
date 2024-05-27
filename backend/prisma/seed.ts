import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  try {

    const hashedPassword = await bcrypt.hash("hashedpassword", 10)

    const user = await prisma.user.upsert({
      where: { email: 'teddie@gmail.com' },
      update: {},
      create: {
        name: 'Teddie Bear',
        email: 'teddie@gmail.com',
        password: hashedPassword,
        date_registered: new Date(),
      },
    });

    const wallet = await prisma.wallet.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        balance: 5000.0,
        user: { connect: { id: user.id } },
      },
    });

    const certificate = await prisma.certificate.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        type: 'Business',
        image_url: 'http://example.com/certificate.jpg',
        info: 'Certificate info',
        user: { connect: { id: user.id } },
      },
    });

    const product = await prisma.product.upsert({
      where: { id: user.id },
      update: {},
      create: {
        name: 'Cement',
        description: '40 sacks of cement',
        image_url: 'http://example.com/product1.jpg',
        category: 'Material',
        seller: { connect: { id: user.id } },
      },
    });

    console.log({ user, wallet, certificate, product });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
