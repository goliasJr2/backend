import { Router } from "express";
import { autenticarToken } from "../middlewares/authMiddleware";
import { editarExtensao, editarPerfil, getPerfil } from "../controllers/usuarioController";

const router = Router();

router.get("/me", autenticarToken, getPerfil);
router.put("/update", autenticarToken, editarPerfil); // Assuming you want to use the same controller for editing profile
router.put("/extensao", autenticarToken, editarExtensao);
export default router;
