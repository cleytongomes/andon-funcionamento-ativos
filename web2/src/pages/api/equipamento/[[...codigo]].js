import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const { method } = req;
    var { codigo } = req.query;

    // Se o codigo não for informado, o padStart vai colocar um 0 no lugar
    codigo = codigo === undefined ? '000001' : String(codigo).padStart(6, '0');
    
    const prisma = new PrismaClient();

    switch (method) {

        case 'GET':
            const equipamento = await prisma.equipamento.findUnique({
                where: {
                    codigo: codigo
                }
            });
            return res.status(200).json(equipamento);
        case 'PUT':
            const equipamentoAtualizado = await prisma.equipamento.update({
                where: {
                    codigo: codigo
                },
                data: {
                    ...req.body
                }
            });
            return res.status(200).json(equipamentoAtualizado);
        case 'DELETE':
            const equipamentoDeletado = await prisma.equipamento.delete({
                where: {
                    codigo: codigo
                }
            });
            return res.status(200).json(equipamentoDeletado);
        case 'POST':
            // Verifica se o codigo já existe
            const equipamentoExiste = await prisma.equipamento.findUnique({
                where: {
                    codigo: req.body.codigo
                }
            });

            if (equipamentoExiste) {
                return res.status(400).json({ error: 'Equipamento já cadastrado' });
            }

            const equipamentoCriado = await prisma.equipamento.create({
                data: {
                    'codigo': req.body.codigo,
                    'nome': req.body.nome,
                    'descricao': req.body.descricao,
                    'codigoSetor': req.body.setor,
                }
            });
            return res.status(200).json(equipamentoCriado);
    }
}