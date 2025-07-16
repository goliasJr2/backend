import { z } from "zod";

export const editarUsuarioSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  telefone: z.string().optional(),
  cidade: z.string().min(2),
  provincia: z.string().min(2),
  latitude: z.number(),
  longitude: z.number(),
});

export const editarExtensaoSchema = z.object({
  omvm: z.string().optional(),
  especialidades: z.array(z.string()).optional(),
  tipoProducao: z.string().optional(),
  descricao: z.string().optional()
});
