import React from 'react';

const cityBackgrounds = [
    {
        id: 1,
        image: "/lavegaimage.png",
        name: "La Vega",
    },
    {
        id: 2,
        image: "/mocaimage.png",
        name: "Moca",
    },
    {
        id: 3,
        image:  "/santiagoimage.png",
        name: "Santiago",
    },
    {
        id: 4,
        image: "/puntaCanaimage.png",
        name: "Punta Cana",
    },
]

interface CityCardProps {
    onClick: (name: string) => void;
}

const CityCard: React.FC<CityCardProps> = ({ onClick }) => {
    return (
        <div className="flex flex-col md:flex-row lg:justify-center lg:items-center space-y-4 md:space-y-0 md:space-x-4 cursor-pointer">
            {cityBackgrounds.map((background, index) => (
                <div 
                    key={index} 
                    className="w-full md:w-64 h-14 justify-center items-center flex" 
                    style={{
                        backgroundImage: `url(${background.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    onClick={() => onClick(background.name)}
                >
                </div>
            ))}
        </div>
    );
};


export default CityCard;