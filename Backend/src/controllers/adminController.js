import { prisma } from "../providers/prisma.js";
import { adminService } from "../services/adminService.js";

export class AdminController {
    static async updateGame(req, res) {
        try {
            const { id } = req.params;
            const gameData = req.body;

            if (!id || !gameData) {
                return res.status(400).json({ message: "Datos inválidos" });
            }

            const updatedGame = await adminService.updateGame(id, gameData);

            return res.status(200).json({
                message: "Juego actualizado exitosamente",
                game: updatedGame
            });
        } catch (error) {
            console.error("Error al actualizar el juego:", error);
            
            if (error.code === 'P2025') {
                return res.status(404).json({ message: "Juego no encontrado" });
            }

            return res.status(500).json({ 
                message: "Error interno del servidor", 
                error: error.message 
            });
        }
    }

    static async deleteGame(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "ID de juego inválido" });
            }

            const deletedGame = await adminService.deleteGame({id});

            return res.status(200).json({
                message: "Juego eliminado exitosamente",
                game: deletedGame
            });
        } catch (error) {
            console.error("Error al eliminar el juego:", error);
            
            if (error.code === 'P2025') {
                return res.status(404).json({ message: "Juego no encontrado" });
            }

            return res.status(500).json({ 
                message: "Error interno del servidor", 
                error: error.message 
            });
        }
    }
}