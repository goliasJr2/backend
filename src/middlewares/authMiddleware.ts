import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  usuario?: {
    id: string;
    email: string;
    tipo: string;
  };
}

export function autenticarToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ erro: "Token não fornecido." });
    return;
  }

  try {
    const payload = verificarToken(token); // agora tem tipo garantido
    req.usuario = payload;
    next();
  } catch (err) {
    res.status(403).json({ erro: "Token inválido ou expirado." });
    return;
  }
}
