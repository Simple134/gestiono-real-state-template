'use client'
import { useState } from "react";
import { formatted } from "./formatted";
import { HeartIcon, BathIcon, BedIcon, ParkingIcon } from "./icons";
import Image from "next/image";
import { Container } from "@bitnation-dev/components";

const Card = ({  multimedia, price, location, bedrooms, bathrooms, parking, onClick }:{
    multimedia: string;
    price: number;
    location: string;
    bedrooms: string;
    bathrooms: string;
    parking: string;
    onClick?: () => void;
}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);
    }

    return (
        <Container>
        <div className="flex flex-col mt-4 p-1 cursor-pointer ">
            <div className="relative w-full">
                {multimedia ? <Image onClick={onClick} width={500} height={500} src={multimedia} alt="" className="aspect-square object-cover w-full h-full" /> : <div className="w-full h-full bg-gray-200"> No Image Available</div>}
                <button className="absolute top-2 right-2" onClick={toggleFavorite}>
                    <HeartIcon color={isFavorite} />
                </button>
            </div>
            <div className="flex flex-col w-full">
                <div className="py-4">
                    <h1 className="text-2xl text-[#3B4504] font-bold">{"US$" + formatted(price)}</h1>
                </div>
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                        <BathIcon />
                        <p className="text-sm text-gray-500">{bathrooms ? bathrooms + " Baths" : "- Baths"}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BedIcon />
                        <p className="text-sm text-gray-500">{bedrooms ? bedrooms + " Beds" : "- Beds"}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ParkingIcon />
                        <p className="text-sm text-gray-500">{parking ? parking + " Parking" : "- Parking"}</p>
                    </div>
                </div>
                <p className="text-sm text-[#3B4504] pt-2">{location ? location : "-"}</p>
            </div>
        </div>
        </Container>
    )
}

export default Card;