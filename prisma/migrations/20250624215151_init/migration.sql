-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('VETERINARIO', 'PRODUTOR', 'CLINICA', 'PETSHOP', 'FARMACIA', 'LOJA_RACAO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "tipo" "TipoUsuario" NOT NULL,
    "cidade" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veterinario" (
    "id" TEXT NOT NULL,
    "omvm" TEXT NOT NULL,
    "especialidades" TEXT[],
    "endereco" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Veterinario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produtor" (
    "id" TEXT NOT NULL,
    "tipoProducao" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Produtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinica" (
    "id" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Clinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Petshop" (
    "id" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Petshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farmacia" (
    "id" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Farmacia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LojaRacao" (
    "id" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "LojaRacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Veterinario_usuarioId_key" ON "Veterinario"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Produtor_usuarioId_key" ON "Produtor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Clinica_usuarioId_key" ON "Clinica"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Petshop_usuarioId_key" ON "Petshop"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Farmacia_usuarioId_key" ON "Farmacia"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "LojaRacao_usuarioId_key" ON "LojaRacao"("usuarioId");

-- AddForeignKey
ALTER TABLE "Veterinario" ADD CONSTRAINT "Veterinario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtor" ADD CONSTRAINT "Produtor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinica" ADD CONSTRAINT "Clinica_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Petshop" ADD CONSTRAINT "Petshop_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Farmacia" ADD CONSTRAINT "Farmacia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LojaRacao" ADD CONSTRAINT "LojaRacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
