import { prisma } from "../utils/prisma";
import { TipoUsuario } from "@prisma/client";

const RAIO_KM = 20;

function calcularDistanciaKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // raio da Terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function listarServicosProximos(params: {
  latitude: number;
  longitude: number;
  tipo?: string;
}) {
  const where = params.tipo
    ? { tipo: params.tipo.toUpperCase() as TipoUsuario }
    : {
        tipo: {
          in: [
            "VETERINARIO",
            "CLINICA",
            "PETSHOP",
            "FARMACIA",
            "LOJA_RACAO",
          ] as TipoUsuario[],
        },
      };

  const usuarios = await prisma.usuario.findMany({
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
      const distancia = calcularDistanciaKm(
        params.latitude,
        params.longitude,
        u.latitude,
        u.longitude
      );
      return { ...u, distancia }; // adiciona a distância
    })
    .filter((u) => u.distancia <= RAIO_KM)
    .sort((a, b) => a.distancia - b.distancia); // ordena do mais próximo para o mais distante

  return proximos;
}

export async function buscarServicoPorSlug(slug: string) {
  const usuario = await prisma.usuario.findUnique({
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
}

