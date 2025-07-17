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
exports.autenticar = exports.registrar = void 0;
const authService_1 = require("../services/authService");
const authSchema_1 = require("../schema/authSchema");
const registrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = authSchema_1.signUpSchemaBackend.parse(req.body);
        const resultado = yield (0, authService_1.registrarUsuario)(data);
        res.status(201).json(resultado);
    }
    catch (error) {
        if (error.name === "ZodError") {
            res.status(400).json({ erro: error.errors });
            return;
        }
        res.status(400).json({ erro: error.message || "Erro ao registrar usuário." });
    }
});
exports.registrar = registrar;
const autenticar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        const resultado = yield (0, authService_1.login)(email, senha); // retorna token
        res.json(resultado);
    }
    catch (error) {
        res.status(401).json({ erro: error.message || "Erro ao fazer login." });
    }
});
exports.autenticar = autenticar;
