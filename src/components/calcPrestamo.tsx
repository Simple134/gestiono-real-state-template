import React, { useState, useEffect, useCallback } from 'react';
import {  ButtonInformation } from "./button";

const CalcPrestamo = () => {
    // Estados para almacenar los valores de entrada
    const [tasaInteres, setTasaInteres] = useState('');
    const [inicial, setInicial] = useState('');
    const [tiempo, setTiempo] = useState('1');
    const [precioVivienda, setPrecioVivienda] = useState('');
    const [mensualidad, setMensualidad] = useState('$0.00');

    const calcularAmortizacion = useCallback(() => {
        const precioTotal = parseFloat(precioVivienda.replace(/[^0-9.-]+/g,""));
        const montoInicial = parseFloat(inicial.replace(/[^0-9.-]+/g,""));
        const tasaAnual = parseFloat(tasaInteres.replace('%', '')) / 100;
        const plazoAnios = parseInt(tiempo);

        const montoPrestamo = precioTotal - montoInicial;
        
        const tasaMensual = tasaAnual / 12;
        
        const numeroPagos = plazoAnios * 12;

        const calculoMensualidad = montoPrestamo * 
            (tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) / 
            (Math.pow(1 + tasaMensual, numeroPagos) - 1);

        const mensualidadFormateada = new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: 'DOP'
        }).format(calculoMensualidad);

        setMensualidad(mensualidadFormateada);
    }, [precioVivienda, inicial, tasaInteres, tiempo]);

    useEffect(() => {
        if (tasaInteres && inicial && precioVivienda) {
            calcularAmortizacion();
        }
    }, [tasaInteres, inicial, tiempo, precioVivienda, calcularAmortizacion]);

    

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
            <h1 className="font-bold text-2xl md:text-3xl text-black uppercase text-center mb-6">
                Calculadora de Préstamo
            </h1>
            <div className="flex flex-col md:flex-row text-black md:space-x-8 space-y-4 md:space-y-0 pb-8">
                <div className="flex flex-col w-full md:w-1/2">
                    <label htmlFor="tasaInteres">Tasa de Interés:</label>
                    <input 
                        id="tasaInteres" 
                        name="tasaInteres" 
                        className="bg-[#F5F5F2] px-2 py-2 rounded-md w-full" 
                        placeholder="17.0%"
                        value={tasaInteres}
                        onChange={(e) => setTasaInteres(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                    <label htmlFor="inicial">Inicial:</label>
                    <input 
                        id="inicial" 
                        name="inicial" 
                        className="bg-[#F5F5F2] px-2 py-2 rounded-md w-full" 
                        placeholder="$18,000.00"
                        value={inicial}
                        onChange={(e) => setInicial(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row text-black md:space-x-8 space-y-4 md:space-y-0">
                <div className="flex flex-col w-full md:w-1/2">
                    <label htmlFor="tiempo">Tiempo:</label>
                    <select 
                        id="tiempo" 
                        name="tiempo" 
                        className="w-full h-10 bg-[#F5F5F2] px-2 rounded-md"
                        value={tiempo}
                        onChange={(e) => setTiempo(e.target.value)}
                    >
                        <option value="1">1 año</option>
                        <option value="2">2 años</option>
                        <option value="3">3 años</option>
                        <option value="4">4 años</option>
                        <option value="5">5 años</option>
                        <option value="6">6 años</option>
                        <option value="7">7 años</option>
                        <option value="8">8 años</option>
                        <option value="9">9 años</option>
                        <option value="10">10 años</option>
                    </select>
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                    <label htmlFor="precioVivienda">Precio de Vivienda:</label>
                    <input 
                        id="precioVivienda" 
                        name="precioVivienda" 
                        className="bg-[#F5F5F2] px-2 py-2 rounded-md w-full" 
                        placeholder="$120,000.00"
                        value={precioVivienda}
                        onChange={(e) => setPrecioVivienda(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="flex flex-col items-center pt-8">
                <p className="text-black">Mensualidad</p>
                <p className="text-black font-bold text-2xl md:text-3xl mb-4">{mensualidad}</p>
                <div className="flex space-x-4">
                    <ButtonInformation 
                        text="Obtener más información" 
                        icon 
                    />
                </div>
            </div>
        </div>
    )
}

export default CalcPrestamo;