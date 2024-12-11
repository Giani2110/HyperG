import { ClientController } from "../controllers/clientController.js";
import { Router } from "express";

const clientRouter = Router();

clientRouter.get("/", ClientController.getAllGames);
clientRouter.get("/games/:id", ClientController.getGameById);
clientRouter.get("/usergames/:id", ClientController.getUserGames);
clientRouter.post("/addgame", ClientController.addGame);
clientRouter.post("/install", ClientController.installGame);
clientRouter.post("/uninstall", ClientController.uninstallGame);

export { clientRouter };