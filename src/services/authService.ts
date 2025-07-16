import { PrismaClient, TipoUsuario } from "@prisma/client";
import { hash, compare } from "bcrypt-ts";
import { gerarToken } from "../utils/jwt";
import { gerarSlugUnico } from "../utils/slug";

const prisma = new PrismaClient();

export async function registrarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
  cidade: string;
  provincia: string;
  latitude: number;
  longitude: number;
  telefone?: string;
  omvm?: string;
  especialidades?: string[];
  endereco?: string;
  tipoProducao?: string;
  animais?: string[];
}) {
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: dados.email },
  });

  if (usuarioExistente) {
    throw new Error("E-mail já está em uso.");
  }

  const senhaHash = await hash(dados.senha, 10);
  const slug = await gerarSlugUnico(dados.nome);

  const novoUsuario = await prisma.usuario.create({
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
      await prisma.veterinario.create({
        data: {
          usuarioId: novoUsuario.id,
          omvm: dados.omvm || "",
          especialidades: dados.especialidades || [],
          endereco: dados.endereco,
        },
      });
      break;

    case "PRODUTOR":
      await prisma.produtor.create({
        data: {
          usuarioId: novoUsuario.id,
          tipoProducao: dados.tipoProducao || "",
        },
      });
      break;

    case "CLINICA":
      await prisma.clinica.create({
        data: {
          usuarioId: novoUsuario.id,
          descricao: dados.endereco || "",
        },
      });
      break;

    case "PETSHOP":
      await prisma.petshop.create({
        data: {
          usuarioId: novoUsuario.id,
          descricao: dados.endereco || "",
        },
      });
      break;

    case "FARMACIA":
      await prisma.farmacia.create({
        data: {
          usuarioId: novoUsuario.id,
          descricao: dados.endereco || "",
        },
      });
      break;

    case "LOJA_RACAO":
      await prisma.lojaRacao.create({
        data: {
          usuarioId: novoUsuario.id,
          descricao: dados.endereco || "",
        },
      });
      break;
  }

  const token = gerarToken({
    id: novoUsuario.id,
    email: novoUsuario.email,
    tipo: novoUsuario.tipo,
  });

  return { usuario: novoUsuario, token };
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
export async function login(email: string, senha: string) {
  console.log("🔵 Tentando login com:", { email, senha });

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    console.log("🔴 Usuário não encontrado com e-mail:", email);
    throw new Error("Credenciais inválidas.");
  }

  console.log("🟢 Usuário encontrado:", usuario.email);
  console.log("🟡 Hash salvo no banco:", usuario.senha);
  console.log("🟠 Senha recebida:", senha);

  const senhaCorreta = await compare(senha, usuario.senha);
  console.log("🔍 Resultado da comparação:", senhaCorreta);

  if (!senhaCorreta) {
    console.log("❌ Senha incorreta.");
    throw new Error("Credenciais inválidas.");
  }

  const token = gerarToken({
    id: usuario.id,
    email: usuario.email,
    tipo: usuario.tipo,
  });

  console.log("✅ Login bem-sucedido. Token gerado.");
  return { usuario, token };
}

