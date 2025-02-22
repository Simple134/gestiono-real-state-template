'use client'

import { useState } from 'react'
import { SideFilter, SideFilterMoney } from './sidefilter'

type FilterProps = {
    results?: number;
    showMobileFilter?: boolean; 
    onPropertyTypeChange?: (types: string[]) => void;
    onPropertyBedroomsChange?: (types: string[]) => void;
    onPropertyBathroomsChange?: (types: string[]) => void;
    onPropertyParkingChange?: (types: string[]) => void;
    onPropertyPriceMinChange?: (types: number) => void;
    onPropertyPriceMaxChange?: (types: number) => void;
}

const Filter = ({ results, showMobileFilter, onPropertyTypeChange, onPropertyBedroomsChange, onPropertyBathroomsChange, onPropertyParkingChange }: FilterProps) => {
    const [onFilter, setOnFilter] = useState(true)
    const [, setSelectedPropertyTypes] = useState<string[]>([]);
    const [, setSelectedPropertyBathrooms] = useState<string[]>([]);
    const [, setSelectedPropertyBedrooms] = useState<string[]>([]);
    const [, setSelectedPropertyParking] = useState<string[]>([]);
    const [, setSelectedPropertyPriceMin] = useState<number>(0);
    const [, setSelectedPropertyPriceMax] = useState<number>(0);

    const handleColor = () => {
        setOnFilter(!onFilter)
    }
    
    const handlePropertyTypeFilter = (selectedTypes: string[]) => {
        setSelectedPropertyTypes(selectedTypes);
        
        if (onPropertyTypeChange) {
            onPropertyTypeChange(selectedTypes);
        }
    }

    const handlePropertyBathroomsFilter = (selectedTypes: string[]) => {
        setSelectedPropertyBathrooms(selectedTypes);
        
        if (onPropertyBathroomsChange) {
            onPropertyBathroomsChange(selectedTypes);
        }
    }

    const handlePropertyBedroomsFilter = (selectedTypes: string[]) => {
        setSelectedPropertyBedrooms(selectedTypes);
        
        if (onPropertyBedroomsChange) {
            onPropertyBedroomsChange(selectedTypes);
        }
    }

    const handlePropertyParkingFilter = (selectedTypes: string[]) => {
        setSelectedPropertyParking(selectedTypes);
        
        if (onPropertyParkingChange) {
            onPropertyParkingChange(selectedTypes);
        }
    }

    const handlePropertyPriceFilterMin = (selectedTypes: number) => {
        setSelectedPropertyPriceMin(selectedTypes);
        
    }

    const handlePropertyPriceFilterMax = (selectedTypes: number) => {
        setSelectedPropertyPriceMax(selectedTypes);
        
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
            <SideFilter 
                title='Tipo de Inmueble' 
                options={[
                    { label: 'Apartamento', value: 'APARTMENT' }, 
                    { label: 'Casas', value: 'HOUSE' }, 
                    { label: 'Oficinas', value: 'OFFICE' }
                ]}
                onFilterChange={handlePropertyTypeFilter}
            />
            <div className='h-32 flex flex-col pt-4'>
                <SideFilterMoney title='Desde' options={[100000, 200000, 300000, 400000, 500000]} onFilterChange={handlePropertyPriceFilterMin}/>
                <SideFilterMoney title='Hasta' options={[100000, 200000, 300000, 400000, 500000]} onFilterChange={handlePropertyPriceFilterMax}/>
            </div>
            <SideFilter title='Habitaciones' options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' }
            ]} onFilterChange={handlePropertyBedroomsFilter} />
            <SideFilter title="Baños" options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' }
            ]} onFilterChange={handlePropertyBathroomsFilter} />
            <SideFilter title="Parqueos" options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' }
            ]} onFilterChange={handlePropertyParkingFilter} />
            <SideFilter title='Amenidades' options={[
                { label: 'Area de Deporte', value: 'SPORT' },
                { label: 'Area de Juego', value: 'GAME' },
                { label: 'Ascensor', value: 'ELEVATOR' },
                { label: 'Balcon', value: 'BALCONY' },
                { label: 'Co-Working', value: 'CO-WORKING' },
                { label: 'Family Room', value: 'FAMILY_ROOM' },
                { label: 'Gimnasio', value: 'GYM' },
                { label: 'Piscina', value: 'POOL' },
                { label: 'Planta Electrica', value: 'ELECTRIC_PLANT' },
                { label: 'Terraza', value: 'TERRACE' },
                { label: 'Gas Comunal', value: 'COMMUNAL_GAS' },
                { label: 'Agua Comunal', value: 'COMMUNAL_WATER' },
                { label: 'Gas Comunal', value: 'COMMUNAL_GAS' },
                { label: 'Agua Comunal', value: 'COMMUNAL_WATER' },
            ]}/>
        </div>
    )
}

export default Filter;