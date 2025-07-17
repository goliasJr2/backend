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
exports.listarServicosProximos = listarServicosProximos;
exports.buscarServicoPorSlug = buscarServicoPorSlug;
const prisma_1 = require("../utils/prisma");
const RAIO_KM = 20;
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function listarServicosProximos(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const where = params.tipo
            ? { tipo: params.tipo.toUpperCase() }
            : {
                tipo: {
                    in: [
                        "VETERINARIO",
                        "CLINICA",
                        "PETSHOP",
                        "FARMACIA",
                        "LOJA_RACAO",
                    ],
                },
            };
        const usuarios = yield prisma_1.prisma.usuario.findMany({
            where,
            include: {
                veterinario: true,
                clinica: true,
                petshop: true,
                farmacia: true,
                lojaRacao: true,
            },
        });
        const proximos = usuarios
            .map((u) => {
            const distancia = calcularDistanciaKm(params.latitude, params.longitude, u.latitude, u.longitude);
            return Object.assign(Object.assign({}, u), { distancia }); // adiciona a distância
        })
            .filter((u) => u.distancia <= RAIO_KM)
            .sort((a, b) => a.distancia - b.distancia); // ordena do mais próximo para o mais distante
        return proximos;
    });
}
function buscarServicoPorSlug(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield prisma_1.prisma.usuario.findUnique({
            where: { slug },
            include: {
                veterinario: true,
                clinica: true,
                petshop: true,
                farmacia: true,
                lojaRacao: true,
            },
        });
        if (!usuario) {
            throw new Error("Serviço não encontrado.");
        }
        return usuario;
    });
}
