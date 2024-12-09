import {prisma } from "../providers/prisma.js";
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
        return prisma.user.create({
          data: {
            username,
            email,
            password,
            type: "client",
            library: [],
          },
        });
    }

    static async update( {id, username, email, password }) {
        return prisma.user.update({
          where: {
            id: id,
          },
          data: {
            username,
            email,
            password,
          },
        });
    }

    static async delete({id}) {
        return prisma.user.delete({
          where: {
            id: id,
          },
        });
    }
}