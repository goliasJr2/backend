"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarioComExtensao = getUsuarioComExtensao;
exports.atualizarUsuario = atualizarUsuario;
exports.atualizarExtensaoUsuario = atualizarExtensaoUsuario;
const client_1 = require("@prisma/client");
const slug_1 = require("../utils/slug");
const prisma = new client_1.PrismaClient();
function getUsuarioComExtensao(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield prisma.usuario.findUnique({
            where: { id },
            include: {
                veterinario: true,
                produtor: true,
                clinica: true,
                petshop: true,
                farmacia: true,
                lojaRacao: true,
            },
        });
        if (!usuario)
            throw new Error("Usuário não encontrado.");
        return usuario;
    });
}
function atualizarUsuario(id, dados) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield prisma.usuario.findUnique({ where: { id } });
        if (!usuario)
            throw new Error("Usuário não encontrado.");
        const novoSlug = yield (0, slug_1.gerarSlugUnico)(dados.nome);
        const atualizado = yield prisma.usuario.update({
            where: { id },
            data: {
                nome: dados.nome,
                email: dados.email,
                telefone: dados.telefone,
                cidade: dados.cidade,
                provincia: dados.provincia,
                latitude: dados.latitude,
                longitude: dados.longitude,
                slug: novoSlug,
            },
        });
        return atualizado;
    });
}
// export async function atualizarExtensaoUsuario(usuarioId: string, tipo: string, dados: {
//   omvm?: string;
//   especialidades?: string[];
//   tipoProducao?: string;
//   descricao?: string;
// }) {
//     const tipoFormatado = tipo.toUpperCase();
//   switch (tipoFormatado) {
//     case "VETERINARIO":
//       return await prisma.veterinario.update({
//         where: { usuarioId },
//         data: {
//           omvm: dados.omvm,
//           especialidades: dados.especialidades,
//         },
//       });
//     case "PRODUTOR":
//       return await prisma.produtor.update({
//         where: { usuarioId },
//         data: {
//           tipoProducao: dados.tipoProducao,
//         },
//       });
//     case "CLINICA":
//     case "PETSHOP":
//     case "FARMACIA":
//     case "LOJA_RACAO":
//       const modelo = tipo.toLowerCase(); // clinica, petshop etc.
//       return await prisma[modelo].update({
//         where: { usuarioId },
//         data: {
//           descricao: dados.descricao,
//         },
//       });
//     default:
//       throw new Error("Tipo de usuário não suportado.");
//   }
// }
function atualizarExtensaoUsuario(usuarioId, tipo, dados) {
    return __awaiter(this, void 0, void 0, function* () {
        const tipoFormatado = tipo.toUpperCase();
        switch (tipoFormatado) {
            case "VETERINARIO":
                return yield prisma.veterinario.update({
                    where: { usuarioId },
                    data: {
                        omvm: dados.omvm,
                        especialidades: dados.especialidades,
                    },
                });
            case "PRODUTOR":
                return yield prisma.produtor.update({
                    where: { usuarioId },
                    data: {
                        tipoProducao: dados.tipoProducao,
                    },
                });
            case "CLINICA":
            case "PETSHOP":
            case "FARMACIA":
            case "LOJA_RACAO":
                let modelo;
                switch (tipoFormatado) {
                    case "CLINICA":
                        modelo = "clinica";
                        break;
                    case "PETSHOP":
                        modelo = "petshop";
                        break;
                    case "FARMACIA":
                        modelo = "farmacia";
                        break;
                    case "LOJA_RACAO":
                        modelo = "lojaRacao";
                        break;
                    default:
                        throw new Error("Tipo de usuário não suportado.");
                }
                switch (modelo) {
                    case "clinica":
                        return yield prisma.clinica.update({
                            where: { usuarioId },
                            data: {
                                descricao: dados.descricao,
                            },
                        });
                    case "petshop":
                        return yield prisma.petshop.update({
                            where: { usuarioId },
                            data: {
                                descricao: dados.descricao,
                            },
                        });
                    case "farmacia":
                        return yield prisma.farmacia.update({
                            where: { usuarioId },
                            data: {
                                descricao: dados.descricao,
                            },
                        });
                    case "lojaRacao":
                        return yield prisma.lojaRacao.update({
                            where: { usuarioId },
                            data: {
                                descricao: dados.descricao,
                            },
                        });
                    default:
                        throw new Error("Tipo de usuário não suportado.");
                }
            default:
                throw new Error("Tipo de usuário não suportado.");
        }
    });
}
