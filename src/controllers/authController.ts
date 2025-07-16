import { Request, Response } from "express";
import { login, registrarUsuario } from "../services/authService";

import { signUpSchemaBackend } from "../schema/authSchema";

export const registrar = async (req: Request, res: Response) => {
  try {
    const data = signUpSchemaBackend.parse(req.body);

    const resultado = await registrarUsuario(data);

    res.status(201).json(resultado);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ erro: error.errors });
      return 
    }
    res.status(400).json({ erro: error.message || "Erro ao registrar usuário." });
  }
}; 


export const autenticar = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const resultado = await login(email, senha); // retorna token
    res.json(resultado);
  } catch (error: any) {
    res.status(401).json({ erro: error.message || "Erro ao fazer login." });
  }
};

