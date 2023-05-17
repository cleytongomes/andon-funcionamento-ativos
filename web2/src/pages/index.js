import { PrismaClient } from "@prisma/client"
import CardEquipamento from "../components/CardEquipamento"
import SwapThema from "@/components/SwapThema";

function Home({ equipamentos }) {
  return (
    <div className="h-screen">
      <h1 className='text-center text-4xl font-bold py-10' >ANDON EQUIPAMENTOS INDUSTRIAIS</h1>
      <SwapThema className='absolute top-0 right-0 p-3' />
      <div className='flex flex-wrap justify-center'>
        {
          equipamentos.map((equipamento) => (
            <CardEquipamento className='w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-2 my-3' key={equipamento.id} equipamento={equipamento}>{equipamento.nome}</CardEquipamento>
          ))
        }
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const equipamentos = await prisma.equipamento.findMany(); // Descomente esta linha para buscar os equipamentos do banco de dados

  return {
    props: {
      equipamentos,
    }
  };
}

export default Home;
