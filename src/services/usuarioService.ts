import { PrismaClient } from "@prisma/client";
import { gerarSlugUnico } from "../utils/slug";

const prisma = new PrismaClient();

export async function getUsuarioComExtensao(id: string) {
  const usuario = await prisma.usuario.findUnique({
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

  if (!usuario) throw new Error("Usuário não encontrado.");

  return usuario;
}

export async function atualizarUsuario(id: string, dados: {
  nome: string;
  email: string;
  telefone?: string;
  cidade: string;
  provincia: string;
  latitude: number;
  longitude: number;
}) {
  const usuario = await prisma.usuario.findUnique({ where: { id } });
  if (!usuario) throw new Error("Usuário não encontrado.");

  const novoSlug = await gerarSlugUnico(dados.nome);

  const atualizado = await prisma.usuario.update({
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
}

export async function atualizarExtensaoUsuario(usuarioId: string, tipo: string, dados: {
  omvm?: string;
  especialidades?: string[];
  tipoProducao?: string;
  descricao?: string;
}) {
    const tipoFormatado = tipo.toUpperCase();
  switch (tipoFormatado) {
    case "VETERINARIO":
      return await prisma.veterinario.update({
        where: { usuarioId },
        data: {
          omvm: dados.omvm,
          especialidades: dados.especialidades,
        },
      });

    case "PRODUTOR":
      return await prisma.produtor.update({
        where: { usuarioId },
        data: {
          tipoProducao: dados.tipoProducao,
        },
      });

    case "CLINICA":
    case "PETSHOP":
    case "FARMACIA":
    case "LOJA_RACAO":
      const modelo = tipo.toLowerCase(); // clinica, petshop etc.
      return await prisma[modelo].update({
        where: { usuarioId },
        data: {
          descricao: dados.descricao,
        },
      });

    default:
      throw new Error("Tipo de usuário não suportado.");
  }
}

