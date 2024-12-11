import { prisma } from "../providers/prisma.js";

export class adminService {
    static async updateGame(id, gameData) {
        try {
            const updatedGame = await prisma.games.update({
                where: { id: parseInt(id) },
                data: {
                    title: gameData.title,
                    genre: gameData.genre,
                    platform: gameData.platform,
                    price: gameData.price,
                    rating: parseFloat(gameData.rating)
                }
            });
            return updatedGame;
        } catch (error) {
            console.error("Error al actualizar el juego:", error);
            throw error;
        }
    }

    static async deleteGame({ id }) {
        try {
            const ident = parseInt(id);
            await prisma.library.deleteMany({
                where: {
                    gameId: ident
                }
            });
    
            const deletedGame = await prisma.games.delete({
                where: {
                    id: ident
                }
            });
    
            return deletedGame;
        } catch (error) {
            console.error("Error al eliminar el juego:", error);
            throw error;
        }
    }

    static async createGame(gameData) {
        try {
            const newGame = await prisma.games.create({
                data: {
                    title: gameData.title,
                    genre: gameData.genre,
                    platform: gameData.platform,
                    price: gameData.price,
                    rating: parseFloat(gameData.rating),
                    img: gameData.img,
                }
            });
            return newGame;
        } catch (error) {
            console.error("Error al crear el juego:", error);
            throw error;
        }
    }
}