import { adminService } from "../services/adminService.js";
import { UserService } from "../services/userService.js";

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

            const deletedGame = await adminService.deleteGame({ id });

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

    static async createGame(req, res) {
        try {
            const gameData = req.body;

            if (!gameData || !gameData.title || !gameData.genre || !gameData.price || !gameData.rating || !gameData.platform || !gameData.img) {
                return res.status(400).json({ message: "Faltan datos para crear el juego." });
            }

            const newGame = await adminService.createGame(gameData);

            return res.status(201).json({
                message: "Juego creado exitosamente",
                game: newGame
            });
        } catch (error) {
            console.error("Error al crear el juego:", error);
            return res.status(500).json({
                message: "Error interno del servidor",
                error: error.message
            });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({
                message: "Error al obtener usuarios",
                error: error.message
            });
        }
    }

    static async updateUserRole(req, res) {
        try {
            const { id } = req.params;
            const { type } = req.body;

            if (!id || !type) {
                return res.status(400).json({ message: "Datos inválidos" });
            }

            const updatedUser = await UserService.updateUserRole(id, type);

            return res.status(200).json({
                message: "Rol de usuario actualizado",
                user: updatedUser
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error al actualizar rol",
                error: error.message
            });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "ID de usuario inválido" });
            }

            const deletedUser = await UserService.deleteUser(id);

            return res.status(200).json({
                message: "Usuario eliminado exitosamente",
                user: deletedUser
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error al eliminar usuario",
                error: error.message
            });
        }
    }
}