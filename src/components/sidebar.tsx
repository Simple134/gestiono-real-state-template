'use client'

import { useState } from 'react'
import { SideFilter, SideFilterMoney } from './sidefilter'
type FilterProps = {
    results?: number;
    showMobileFilter?: boolean;
}

const Filter = ({ results, showMobileFilter }: FilterProps) => {
    const [onFilter, setOnFilter] = useState(true)

    const handleColor = () => {
        setOnFilter(!onFilter)
    }
    
    return (
        <div className={`
            fixed md:relative top-0 left-0 h-full 
            w-2/4 md:w-full 
            bg-white 
            transform transition-transform duration-300 ease-in-out
            ${showMobileFilter ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0
            z-50
            overflow-y-auto
            p-4
            shadow-lg md:shadow-none no-scrollbar
        `}>
            <div className="flex pb-8">
                <p className="text-black font-bold">{results} Resultados</p>
            </div>
            <div className="flex">
                <button 
                    className={`w-1/2 h-10 ${onFilter ? 'bg-[#3B4504] text-white' : 'text-[#3B4504] border-2 border-[#3B4504]'}`} 
                    onClick={handleColor}
                >
                    Comprar
                </button>
                <button 
                    className={`w-1/2 h-10 ${!onFilter ? 'bg-[#3B4504] text-white' : 'text-[#3B4504] border-2 border-[#3B4504]'}`} 
                    onClick={handleColor}
                >
                    Alquilar
                </button>
            </div>
            <SideFilter title='Tipo de Inmueble' options={["Apartamento", "Casas", "Condominios", "Eco Amigable", "Estancia Corta", "Turisticos", "Solares", "Torres", "Oficinas"]}/>
            <div className='h-32 flex flex-col pt-4'>
                <SideFilterMoney title='Desde' options={["100000", "200000", "300000", "400000", "500000"]}/>
                <SideFilterMoney title='Hasta' options={["100000", "200000", "300000", "400000", "500000"]}/>
            </div>
            <SideFilter title='Habitaciones' options={["1", "2", "3", "4", "5"]}/>
            <SideFilter title="Baños" options={["1", "2", "3"]} />
            <SideFilter title="Parqueos" options={["1", "2", "3"]} />
            <SideFilter title='Amenidades' options={["Area de Deporte", "Area de Juego", "Ascensor", "Balcon", "Co-Working", "Family Room", "Gimnasio", "Piscina","Planta Electrica", "Terraza", "Gas Comung"]}/>
        </div>
    )
}

export default Filter;