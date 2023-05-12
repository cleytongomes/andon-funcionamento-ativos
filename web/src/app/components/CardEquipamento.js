"use client"

import io from 'socket.io-client'
import { useEffect, useState } from 'react'

export default function CardEquipamento() {

    const [equipamento1, setEquipamento1] = useState(0);
    const [equipamento2, setEquipamento2] = useState(0);

    useEffect(() => {
        const socket = io('http://localhost:3001',
            {
                query: {
                    token: 'TESTE'
                }
            });

        socket.on('connect', () => {
            socket.emit('subscribe', 'equipamento1/estado');
            socket.emit('subscribe', 'equipamento2/estado');
        });

        socket.on('equipamento1/estado', (data) => {
            setEquipamento1(data);
            
        });

        socket.on('equipamento2/estado', (data) => {
            setEquipamento2(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>CardEquipamento</h1>
            <h1>EQUIPAMENTO 1 : {equipamento1}</h1>
        </div>
    )
}
