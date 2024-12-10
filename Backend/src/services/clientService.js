import {prisma } from "../providers/prisma.js";

export class clientService {
    static async getAllGames() {
        return await prisma.games.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                genre: true,
                rating: true,
                platform: true,
                img: true,
            },
        });
    }

    static async getGameById(id) {
        return await prisma.games.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                price: true,
                genre: true,
                rating: true,
                platform: true,
                img: true,
            },
        });
    }

    static async getUserGames(id) {
        console.log(id);
        const ident = parseInt(id);
    
        if (isNaN(ident)) {
            return [];
        }
    
        try {
            const userLibrary = await prisma.library.findMany({
                where: {
                    userId: ident,
                },
                include: {
                    game: true,
                },
            });
    
            return userLibrary || [];
        } catch (error) {
            console.error("Error al obtener los juegos del usuario:", error);
            return [];
        }
    }

    
}