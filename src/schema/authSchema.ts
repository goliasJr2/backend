import { z } from "zod";

export const TipoUsuarioEnum = z.enum([
  "VETERINARIO",
  "PRODUTOR",
  "CLINICA",
  "PETSHOP",
  "FARMACIA",
  "LOJA_RACAO",
]);

export const signUpSchemaBackend = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha muito curta"),
  tipo: TipoUsuarioEnum,
  cidade: z.string().min(2, "Cidade obrigatória"),
  provincia: z.string().min(2, "provincia obrigatória"),
  telefone: z.string().optional(),

  latitude: z.number(),
  longitude: z.number(),

  // Campos opcionais por tipo:
  omvm: z.string().optional(),
  especialidades: z.array(z.string()).optional(),
  endereco: z.string().optional(),
  tipoProducao: z.string().optional(),
  animais: z.array(z.string()).optional(),
});
