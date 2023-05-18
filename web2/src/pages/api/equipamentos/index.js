import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const prisma = new PrismaClient();
        const equipamentos = await prisma.equipamento.findMany();

        res.status(200).json(equipamentos);
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}