import { Router } from "express";
import * as pingController from "../controllers/ping";
import authRouters from "./authRoutes";
import usuarioRouters from "./usuarioRoutes";
import servicoRoutes from "./servicoRoutes";
export const mainRouter = Router();

mainRouter.get('/', pingController.ping)
mainRouter.use('/auth', authRouters);
mainRouter.use('/usuario', usuarioRouters);
mainRouter.use("/servicos", servicoRoutes);

