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
exports.editarExtensao = exports.editarPerfil = exports.getPerfil = void 0;
const usuarioService_1 = require("../services/usuarioService");
const usuarioSchema_1 = require("../schema/usuarioSchema");
const getPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req;
    if (!usuario) {
        res.status(401).json({ erro: "Usuário não autenticado." });
        return;
    }
    try {
        const perfil = yield (0, usuarioService_1.getUsuarioComExtensao)(usuario.id);
        res.json(perfil);
        return;
    }
    catch (error) {
        res.status(400).json({ erro: error.message });
        return;
    }
});
exports.getPerfil = getPerfil;
const editarPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req;
    if (!usuario) {
        res.status(401).json({ erro: "Usuário não autenticado." });
        return;
    }
    try {
        const dados = usuarioSchema_1.editarUsuarioSchema.parse(req.body);
        const resultado = yield (0, usuarioService_1.atualizarUsuario)(usuario.id, dados);
        res.json(resultado);
    }
    catch (error) {
        if (error.name === "ZodError") {
            res.status(400).json({ erro: error.errors });
            return;
        }
        res.status(400).json({ erro: error.message });
        return;
    }
});
exports.editarPerfil = editarPerfil;
const editarExtensao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req;
    if (!usuario) {
        res.status(401).json({ erro: "Usuário não autenticado." });
        return;
    }
    try {
        const dados = usuarioSchema_1.editarExtensaoSchema.parse(req.body);
        const resultado = yield (0, usuarioService_1.atualizarExtensaoUsuario)(usuario.id, usuario.tipo, dados);
        res.json(resultado);
    }
    catch (error) {
        if (error.name === "ZodError") {
            res.status(400).json({ erro: error.errors });
            return;
        }
        res.status(400).json({ erro: error.message });
        return;
    }
});
exports.editarExtensao = editarExtensao;
