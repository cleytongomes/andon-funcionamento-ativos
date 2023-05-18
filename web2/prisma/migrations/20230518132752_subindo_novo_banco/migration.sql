-- CreateTable
CREATE TABLE "Equipamento" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "codigoSetor" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipamento_codigo_key" ON "Equipamento"("codigo");
