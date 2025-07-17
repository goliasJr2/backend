"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchemaBackend = exports.TipoUsuarioEnum = void 0;
const zod_1 = require("zod");
exports.TipoUsuarioEnum = zod_1.z.enum([
    "VETERINARIO",
    "PRODUTOR",
    "CLINICA",
    "PETSHOP",
    "FARMACIA",
    "LOJA_RACAO",
]);
exports.signUpSchemaBackend = zod_1.z.object({
    nome: zod_1.z.string().min(3, "Nome muito curto"),
    email: zod_1.z.string().email("Email inválido"),
    senha: zod_1.z.string().min(6, "Senha muito curta"),
    tipo: exports.TipoUsuarioEnum,
    cidade: zod_1.z.string().min(2, "Cidade obrigatória"),
    provincia: zod_1.z.string().min(2, "provincia obrigatória"),
    telefone: zod_1.z.string().optional(),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
    // Campos opcionais por tipo:
    omvm: zod_1.z.string().optional(),
    especialidades: zod_1.z.array(zod_1.z.string()).optional(),
    endereco: zod_1.z.string().optional(),
    tipoProducao: zod_1.z.string().optional(),
    animais: zod_1.z.array(zod_1.z.string()).optional(),
});
