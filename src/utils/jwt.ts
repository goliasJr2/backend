import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo-padrao";

interface TokenPayload {
  id: string;
  email: string;
  tipo: string;
}

export function gerarToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verificarToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
