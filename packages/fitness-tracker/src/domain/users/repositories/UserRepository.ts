import { PrismaClient } from '@prisma/client';
import { User } from '../../entities/User';

const prisma = new PrismaClient();

export class UserRepository {
  async create(userData: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
      },
    });

    return newUser;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async update(userId: string, userData: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: userData.email,
        password: userData.password,
      },
    });

    return updatedUser;
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}