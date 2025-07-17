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
exports.getServicoPorSlug = exports.getServicosProximos = void 0;
const servicoService_1 = require("../services/servicoService");
const getServicosProximos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const lat = Number(req.query.lat);
        const lng = Number(req.query.lng);
        const tipo = (_a = req.query.tipo) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase(); // ex: PETSHOP
        if (isNaN(lat) || isNaN(lng)) {
            res.status(400).json({
                erro: "Parâmetros 'lat' e 'lng' são obrigatórios e devem ser números.",
            });
            return;
        }
        const servicos = yield (0, servicoService_1.listarServicosProximos)({
            latitude: lat,
            longitude: lng,
            tipo,
        });
        res.json(servicos);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
exports.getServicosProximos = getServicosProximos;
const getServicoPorSlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const servico = yield (0, servicoService_1.buscarServicoPorSlug)(slug);
        res.json(servico);
    }
    catch (error) {
        res.status(404).json({ erro: error.message });
    }
});
exports.getServicoPorSlug = getServicoPorSlug;
