import bcrypt from 'bcryptjs';
import { prisma } from '../providers/prisma.js';

export class UserService {
  static async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        type: true,
        password: false,
      },
    });
  }

  static async getByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        type: true,
        password: true, 
      },
    });
  }

  static async getById(id) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        type: true,
        password: true,
        library: {
          select: {
            id: true,
            name: true,
            rating: true,
            genre: true,
            price: true,
            platform: true,
            img: true,
            installed: true,
          },
        },
      },
    });
  }

  static async create({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hasheamos la contraseña
    return prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        type: 'client',
      },
    });
  }

  static async update({ id, username, email, password }) {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updateData = {
      username,
      email,
      password: hashedPassword || undefined,
    };

    return prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });
  }

  static async delete({ id }) {
    return prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}