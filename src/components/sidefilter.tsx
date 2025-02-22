import { MoneyIcon } from "./icons";
import { useState } from "react";

type FilterOption = {
    label: string;
    value: string;
}

type SideFilterProps = {
    title: string;
    options: FilterOption[];
    onFilterChange?: (selectedOptions: string[]) => void;
}

export const SideFilter = ({ title, options, onFilterChange }: SideFilterProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleCheckboxChange = (value: string, checked: boolean) => {
        let updatedOptions: string[];
        if (checked) {
            updatedOptions = [...selectedOptions, value];
        } else {
            updatedOptions = selectedOptions.filter(option => option !== value);
        }
        
        setSelectedOptions(updatedOptions);
        
        console.log(`Filtros de ${title}:`, updatedOptions);
        
        if (onFilterChange) {
            onFilterChange(updatedOptions);
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {options.map((opcion, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id={`opcion-${index}`}
                        className="mr-2"
                        onChange={(e) => handleCheckboxChange(opcion.value, e.target.checked)}
                    />
                    <label htmlFor={`opcion-${index}`} className="text-sm">
                        {opcion.label}
                    </label>
                </div>
            ))}
        </div>
    )
}

type SideFilterMoneyProps = {       
    title: string;
    options: number[];
    onFilterChange?: (selectedOptions: number) => void;

}

export const SideFilterMoney = ({ title, options, onFilterChange }: SideFilterMoneyProps) => {
    const [, setSelectedOption] = useState<number>(0);

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setSelectedOption(value);
        
        if (onFilterChange) {
            onFilterChange(value);
        }
    }
    return (
        <div className='h-24'>
            <div className='flex items-center space-x-4 text-center space-y-2'>
                <p className='text-lg font-semibold text-[#3B4504] w-12'>{title}</p>
                <div className='relative'>
                    <select 
                        onChange={handleOptionChange}
                        className='border border-[#3B4504] p-3 pl-8 bg-white appearance-none hover:cursor-pointer'
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <MoneyIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}