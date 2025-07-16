import { Router } from "express";
import { autenticarToken } from  "../middlewares/authMiddleware";

const router = Router();

router.get("/perfil", autenticarToken, (req, res) => {
  const usuario = (req as any).usuario;
  res.json({ mensagem: "Acesso autorizado", usuario });
});

export default router;
