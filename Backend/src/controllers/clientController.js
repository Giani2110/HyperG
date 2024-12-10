import { prisma } from "../providers/prisma.js";
import { clientService } from "../services/clientService.js";

export class ClientController {
  static async getAllGames(req, res) {
    try {
      const games = await clientService.getAllGames();
      return res.status(200).json({ games });
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getGameById(req, res) {
    try {
      const { id } = req.params;
      const game = await clientService.getGameById(id);
      return res.status(200).json({ game });
    } catch (error) {
      console.error("Error al obtener el juego:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getUserGames(req, res) {
    try {
      const { id } = req.params;
      const userGames = await clientService.getUserGames(id);
      return res.status(200).json({ userGames });
    } catch (error) {
      console.error("Error al obtener los juegos del usuario:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async addGame(req, res) {
    try {
      const { userId, gameId, instaled = false } = req.body;

      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!userExists) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const gameExists = await prisma.games.findUnique({
        where: { id: parseInt(gameId) },
      });
      if (!gameExists) {
        return res.status(404).json({ message: 'Juego no encontrado' });
      }

      const gameInLibrary = await prisma.library.findFirst({
        where: {
          userId: parseInt(userId),
          gameId: parseInt(gameId),
        },
      });

      if (gameInLibrary) {
        return res.status(400).json({ message: 'Este juego ya lo tienes' });
      }

      const newLibraryEntry = await prisma.library.create({
        data: {
          userId: parseInt(userId),
          gameId: parseInt(gameId),
          instaled,
        },
      });

      return res.status(201).json({
        message: 'Juego agregado a la biblioteca con éxito',
        library: newLibraryEntry,
      });
    } catch (error) {
      console.error("Error al agregar el juego:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async installGame(req, res) {
    try {
      const { libraryId } = req.body;

      const updatedGame = await prisma.library.update({
        where: {
          id: libraryId,
        },
        data: {
          instaled: true,
        },
      });

      return res.status(200).json({ message: 'Juego instalado con éxito', game: updatedGame });
    } catch (error) {
      console.error("Error al instalar el juego:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async uninstallGame(req, res) {
    try {
      const { libraryId } = req.body;

      const updatedGame = await prisma.library.update({
        where: {
          id: libraryId,
        },
        data: {
          instaled: false,
        },
      });

      return res.status(200).json({ message: 'Juego desinstalado con éxito', game: updatedGame });
    } catch (error) {
      console.error("Error al desinstalar el juego:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async updateProfile(req, res) {
    const { id } = req.user;
    const { username, email, password } = req.body;

    try {
      const updatedUser = await UserService.update({ id, username, email, password });
      res.status(200).json({ message: 'Perfil actualizado correctamente', user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

  