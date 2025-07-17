"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarExtensaoSchema = exports.editarUsuarioSchema = void 0;
const zod_1 = require("zod");
exports.editarUsuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    telefone: zod_1.z.string().optional(),
    cidade: zod_1.z.string().min(2),
    provincia: zod_1.z.string().min(2),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
});
exports.editarExtensaoSchema = zod_1.z.object({
    omvm: zod_1.z.string().optional(),
    especialidades: zod_1.z.array(zod_1.z.string()).optional(),
    tipoProducao: zod_1.z.string().optional(),
    descricao: zod_1.z.string().optional()
});
