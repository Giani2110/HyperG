import { AdminController } from "../controllers/adminController.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.put("/updategame/:id", AdminController.updateGame);
adminRouter.delete("/deletegame/:id", AdminController.deleteGame);
adminRouter.post("/creategame", AdminController.createGame);

export { adminRouter };