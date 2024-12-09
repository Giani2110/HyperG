import express from "express";
import cors from "cors";

import { API_PREFIX } from "./config/config.js";

import dirname from "../dirname.js";

import morgan from "morgan";
import path from "path";

import { authRouter } from "./routes/authRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.resolve(dirname, "../public")));

app.use(`${API_PREFIX}/auth`, authRouter);

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});