import slugify from "slugify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function gerarSlugUnico(nome: string): Promise<string> {
  let baseSlug = slugify(nome, { lower: true, strict: true });
  let slug = baseSlug;
  let contador = 1;

  while (await prisma.usuario.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${contador}`;
    contador++;
  }

  return slug;
}
