import { prisma } from "../providers/prisma.js";

export class UserService {
  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        include: {
          library: {
            include: {
              game: true
            }
          }
        }
      });

      return users.map(user => ({
        ...user,
        library: user.library.map(item => ({
          title: item.game.title,
          price: item.game.price
        }))
      }));
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
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
    return prisma.user.create({
      data: {
        username,
        email,
        password,
        type: "client",
      },
    });
  }

  static async updateUserRole(userId, newRole) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { type: newRole }
      });
      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      await prisma.library.deleteMany({
        where: { userId: parseInt(userId) }
      });

      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(userId) }
      });

      return deletedUser;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  }
}