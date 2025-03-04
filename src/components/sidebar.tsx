"use client";

import { SideFilter, SideFilterMoney } from "./sidefilter";
import { Filters } from "@/propertyType";

type FilterProps = {
    filters: Filters;
    results?: number;
    showMobileFilter?: boolean;
    onFilterChange?: <T extends keyof Filters>(key: T) => (selectedOptions: Filters[T]) => void;
};

const Filter = ({
    results,
    showMobileFilter,
    filters,
    onFilterChange
}: FilterProps) => {
    const { propertyUsage } = filters;
    return (
        <div
            className={`
            fixed md:relative top-0 left-0 h-full 
            w-2/4 md:w-full 
            bg-white 
            transform transition-transform duration-300 ease-in-out
            ${showMobileFilter ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0
            z-50
            overflow-y-auto
            p-4
            shadow-lg md:shadow-none no-scrollbar
        `}
        >
            <div className="flex pb-8">
                <p className="text-black font-bold">{results} Resultados</p>
            </div>
            <div className="flex">
                <button
                    className={`w-1/2 h-10 ${propertyUsage === "buy"
                            ? "bg-[#3B4504] text-white"
                            : "text-[#3B4504] border-2 border-[#3B4504]"
                        }`}
                    onClick={() => onFilterChange?.("propertyUsage")("buy")}
                >
                    Comprar
                </button>
                <button
                    className={`w-1/2 h-10 ${propertyUsage === "rent"
                            ? "bg-[#3B4504] text-white"
                            : "text-[#3B4504] border-2 border-[#3B4504]"
                        }`}
                    onClick={() => onFilterChange?.("propertyUsage")("rent")}
                >
                    Alquilar
                </button>
            </div>
            <SideFilter
                title="Tipo de Inmueble"
                options={[
                    { label: "Apartamento", value: "APARTMENT" },
                    { label: "Casas", value: "HOUSE" },
                    { label: "Oficinas", value: "OFFICE" },
                ]}
                onFilterChange={onFilterChange?.("propertyTypes")}
            />
            <div className="h-32 flex flex-col pt-4">
                <SideFilterMoney
                    title="Desde"
                    options={[100000, 200000, 300000, 400000, 500000]}
                    onFilterChange={onFilterChange?.("propertyPriceMin")}
                />
                <SideFilterMoney
                    title="Hasta"
                    options={[100000, 200000, 300000, 400000, 500000]}
                    onFilterChange={onFilterChange?.('propertyPriceMax')}
                />
            </div>
            <SideFilter
                title="Habitaciones"
                options={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                ]}
                onFilterChange={onFilterChange?.("propertyBedrooms")}
            />
            <SideFilter
                title="Baños"
                options={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                ]}
                onFilterChange={onFilterChange?.("propertyBathrooms")}
            />
            <SideFilter
                title="Parqueos"
                options={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                ]}
                onFilterChange={onFilterChange?.("propertyParking")}
            />
            <SideFilter
                title="Amenidades"
                options={[
                    { label: "Area de Deporte", value: "SPORT" },
                    { label: "Area de Juego", value: "GAME" },
                    { label: "Ascensor", value: "ELEVATOR" },
                    { label: "Balcon", value: "BALCONY" },
                    { label: "Co-Working", value: "CO-WORKING" },
                    { label: "Family Room", value: "FAMILY_ROOM" },
                    { label: "Gimnasio", value: "GYM" },
                    { label: "Piscina", value: "POOL" },
                    { label: "Planta Electrica", value: "ELECTRIC_PLANT" },
                    { label: "Terraza", value: "TERRACE" },
                    { label: "Gas Comunal", value: "COMMUNAL_GAS" },
                    { label: "Agua Comunal", value: "COMMUNAL_WATER" },
                    { label: "Gas Comunal", value: "COMMUNAL_GAS" },
                    { label: "Agua Comunal", value: "COMMUNAL_WATER" },
                ]}
            />
        </div>
    );
};

export default Filter;
