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
exports.registrarUsuario = registrarUsuario;
exports.login = login;
const client_1 = require("@prisma/client");
const bcrypt_ts_1 = require("bcrypt-ts");
const jwt_1 = require("../utils/jwt");
const slug_1 = require("../utils/slug");
const prisma = new client_1.PrismaClient();
function registrarUsuario(dados) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuarioExistente = yield prisma.usuario.findUnique({
            where: { email: dados.email },
        });
        if (usuarioExistente) {
            throw new Error("E-mail já está em uso.");
        }
        const senhaHash = yield (0, bcrypt_ts_1.hash)(dados.senha, 10);
        const slug = yield (0, slug_1.gerarSlugUnico)(dados.nome);
        const novoUsuario = yield prisma.usuario.create({
            data: {
                nome: dados.nome,
                email: dados.email,
                senha: senhaHash,
                tipo: dados.tipo,
                cidade: dados.cidade,
                provincia: dados.provincia,
                latitude: dados.latitude,
                longitude: dados.longitude,
                telefone: dados.telefone,
                slug,
            },
        });
        // Cria extensão conforme o tipo:
        switch (dados.tipo) {
            case "VETERINARIO":
                yield prisma.veterinario.create({
                    data: {
                        usuarioId: novoUsuario.id,
                        omvm: dados.omvm || "",
                        especialidades: dados.especialidades || [],
                        endereco: dados.endereco,
                    },
                });
                break;
            case "PRODUTOR":
                yield prisma.produtor.create({
                    data: {
                        usuarioId: novoUsuario.id,
                        tipoProducao: dados.tipoProducao || "",
                    },
                });
                break;
            case "CLINICA":
                yield prisma.clinica.create({
                    data: {
                        usuarioId: novoUsuario.id,
                        descricao: dados.endereco || "",
                    },
                });
                break;
            case "PETSHOP":
                yield prisma.petshop.create({
                    data: {
                        usuarioId: novoUsuario.id,
                        descricao: dados.endereco || "",
                    },
                });
                break;
            case "FARMACIA":
                yield prisma.farmacia.create({
                    data: {
                        usuarioId: novoUsuario.id,
                        descricao: dados.endereco || "",
                    },
                });
                break;
            case "LOJA_RACAO":
                yield prisma.lojaRacao.create({
                    data: {
                        usuarioId: novoUsuario.id,
                        descricao: dados.endereco || "",
                    },
                });
                break;
        }
        const token = (0, jwt_1.gerarToken)({
            id: novoUsuario.id,
            email: novoUsuario.email,
            tipo: novoUsuario.tipo,
        });
        return { usuario: novoUsuario, token };
    });
}
// export async function login(email: string, senha: string) {
// const usuario = await prisma.usuario.findUnique({
//   where: { email },
// });
// if (!usuario) {
//   throw new Error("Credenciais inválidas.");
// }
// const senhaCorreta = await compare(senha, usuario.senha);
// if (!senhaCorreta) {
//   throw new Error("Credenciais inválidas.");
// }
// const token = gerarToken({
//   id: usuario.id,
//   email: usuario.email,
//   tipo: usuario.tipo,
// });
// return { usuario, token };
// }
function login(email, senha) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🔵 Tentando login com:", { email, senha });
        const usuario = yield prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            console.log("🔴 Usuário não encontrado com e-mail:", email);
            throw new Error("Credenciais inválidas.");
        }
        console.log("🟢 Usuário encontrado:", usuario.email);
        console.log("🟡 Hash salvo no banco:", usuario.senha);
        console.log("🟠 Senha recebida:", senha);
        const senhaCorreta = yield (0, bcrypt_ts_1.compare)(senha, usuario.senha);
        console.log("🔍 Resultado da comparação:", senhaCorreta);
        if (!senhaCorreta) {
            console.log("❌ Senha incorreta.");
            throw new Error("Credenciais inválidas.");
        }
        const token = (0, jwt_1.gerarToken)({
            id: usuario.id,
            email: usuario.email,
            tipo: usuario.tipo,
        });
        console.log("✅ Login bem-sucedido. Token gerado.");
        return { usuario, token };
    });
}
