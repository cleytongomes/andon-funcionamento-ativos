"use client"

import io from 'socket.io-client'
import { useEffect, useState } from 'react'

export default function CardEquipamento({children, equipamento, className}) {

    console.log(equipamento);

    const [estado, setEstado] = useState();
    const [temperatura, setTemperatura] = useState();

    console.log(`ESTADO: ${estado} - ${typeof estado}`);

    useEffect(() => {
        const socket = io('http://localhost:3001',
            {
                query: {
                    token: 'TESTE'
                }
            });

        socket.on('connect', () => {
            socket.emit('subscribe', `equipamento/${equipamento.codigo}/estado`);
            socket.emit('subscribe', `equipamento/${equipamento.codigo}/temperatura`);
        });

        socket.on(`equipamento/${equipamento.codigo}/estado`, (data) => {
            console.log(data);
            setEstado(data === '1'? true:false);
        });

        socket.on(`equipamento/${equipamento.codigo}/temperatura`, (data) => {
            setTemperatura(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className={`card bg-base-100 shadow-xl ${className}`}>
            <div className="card-body">
                <div className='flex'>
                    <h2 className="text-center card-title text-3xl w-4/5">{children}</h2>
                    <label className={`swap swap-flip text-3xl w-1/5 ${typeof estado == 'undefined'? 'hidden':''  }`}>
                        <input type="checkbox" checked={estado} readOnly onChange={() => {}} />
                        <div className="swap-on">🟢</div>
                        <div className="swap-off">🔴</div>
                    </label>
                </div>
                <h2 className="text-center">TEMPERATURA : {temperatura}°C</h2>
            </div>
        </div>
    )
}
