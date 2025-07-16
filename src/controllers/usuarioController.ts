import { Request, Response } from "express";
import {
  atualizarExtensaoUsuario,
  atualizarUsuario,
  getUsuarioComExtensao,
} from "../services/usuarioService";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  editarExtensaoSchema,
  editarUsuarioSchema,
} from "../schema/usuarioSchema";

export const getPerfil = async (req: Request, res: Response) => {
  const { usuario } = req as AuthRequest;

  if (!usuario) {
    res.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  try {
    const perfil = await getUsuarioComExtensao(usuario.id);
    res.json(perfil);
    return;
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
    return;
  }
};

export const editarPerfil = async (req: Request, res: Response) => {
  const { usuario } = req as AuthRequest;

  if (!usuario) {
    res.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  try {
    const dados = editarUsuarioSchema.parse(req.body);

    const resultado = await atualizarUsuario(usuario.id, dados);

    res.json(resultado);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ erro: error.errors });
      return;
    }

    res.status(400).json({ erro: error.message });
    return;
  }
};

export const editarExtensao = async (req: Request, res: Response) => {
  const { usuario } = req as AuthRequest;

  if (!usuario) {
    res.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  try {
    const dados = editarExtensaoSchema.parse(req.body);

    const resultado = await atualizarExtensaoUsuario(
      usuario.id,
      usuario.tipo,
      dados
    );

    res.json(resultado);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ erro: error.errors });
      return;
    }
    res.status(400).json({ erro: error.message });
    return;
  }
};
