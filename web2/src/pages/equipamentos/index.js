import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { VscTrash, VscEdit } from 'react-icons/vsc';

export default function Crud({ equipamentos_props }) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [equipamentos, setEquipamentos] = useState([...equipamentos_props]);
    const [show, setShow] = useState(false);

    const onSubmit = (data) => {
        fetch('http://localhost:3001/api/equipamento/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            res => res.json()
        ).then(res => {
            // Recarrega os equipamentos
            if (res.codigo) {
                setEquipamentos([...equipamentos, res]);
                setShow(true);
            } else {
                setShow(true);
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="py-4" >
            {/* CARD DE LANÇAMENTO */}
            <div className="overflow-x-auto w-3/4 m-auto">
                <h1 className="text-4xl text-center uppercase font-bold">Cadastro de Equipamentos</h1>

                <form method="POST" action="/api/equipamentos" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="form-control w-full">

                        <label className="label">
                            <span className="label-text">Codigo</span>
                            {errors.codigo && <span>Nome é obrigatório</span>}
                        </label>
                        <input {...register('codigo', { required: true, maxLength: 6 })} type="text" placeholder="codigo" className="input input-bordered w-full" />

                        <label className="label">
                            <span className="label-text">Máquina</span>
                            {errors.nome && <span>Nome é obrigatório</span>}
                        </label>
                        <input {...register('nome', { required: true })} type="text" placeholder="maquina" className="input input-bordered w-full" />

                        <label className="label">
                            <span className="label-text">Setor</span>
                            {errors.setor && <span>Nome é obrigatório</span>}
                        </label>
                        <input {...register('setor', { required: true })} type="text" placeholder="setor" className="input input-bordered w-full" />

                        <label className="descricao">
                            <span className="label-text">Descrição</span>
                            {errors.descricao && <span>Nome é obrigatório</span>}
                        </label>
                        <input {...register('descricao', { required: true })} type="text" placeholder="descrição" className="input input-bordered w-full" />

                        <button className="btn my-5" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>

            <div className="overflow-x-auto w-3/4 m-auto mt-4">

                <h1 className="text-4xl text-center uppercase font-bold my-3">Lista de Equipamentos</h1>

                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOME</th>
                            <th>DESCRICAO</th>
                            <th>SETOR</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            equipamentos?.map(equipamento => (
                                <tr key={equipamento.id}>
                                    <td>
                                        {equipamento.codigo}
                                    </td>
                                    <td>
                                        {equipamento.nome}
                                    </td>
                                    <td>
                                        {equipamento.descricao}
                                    </td>
                                    <td>
                                        {equipamento.codigoSetor}
                                    </td>
                                    <td>
                                        <Link href={`/api/equipamento/${equipamento.codigo}`}><VscEdit /></Link>
                                    </td>
                                    <td>
                                        <VscTrash onClick={() => {
                                            fetch('http://localhost:3001/api/equipamento/' + equipamento.codigo, {
                                                method: 'DELETE'
                                            }).then(
                                                res => res.json()
                                            ).then(res => {
                                                // Recarrega os equipamentos
                                                if (res.codigo) {
                                                    setEquipamentos(equipamentos.filter(equipamento => equipamento.id !== res.id));
                                                    setShow(true);
                                                } else {
                                                    setShow(true);
                                                }
                                            }).catch(err => console.log(err))
                                        }}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className={`modal cursor-pointer ${show ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn" onClick={() => setShow(false)}>Yay!</label>
                    </div>
                </div>
            </div>

        </div>
    )
}

export async function getServerSideProps({ req, res }) {

    const { host } = req.headers;

    const response = await fetch('http://' + host + '/api/equipamentos')
    const equipamentos_props = await response.json()

    return {
        props: {
            equipamentos_props,
        }
    }
}