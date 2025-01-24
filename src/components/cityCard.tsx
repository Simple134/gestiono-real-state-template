import React from 'react';

const cityBackgrounds = [
    "/lavegaimage.png",
    "/mocaimage.png",
    "/santiagoimage.png",
    "/puntaCanaimage.png",
]

const CityCard = () => {
    return (
        <div className="flex flex-col md:flex-row lg:justify-center lg:items-center space-y-4 md:space-y-0 md:space-x-4 ">
            {cityBackgrounds.map((background, index) => (
                <div 
                    key={index} 
                    className="md:w-80 h-12 justify-center items-center flex" 
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                </div>
            ))}
        </div>
    );
};


export default CityCard;