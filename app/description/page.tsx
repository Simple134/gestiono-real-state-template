"use client"

import CalcPrestamo from "@/components/calcPrestamo";
import Card from "@/components/cards";
import { formatted } from "@/components/formatted";
import { ArrowButtonLeft, ArrowButtonRight, BathIcon, BedIcon, ParkingIcon, ProfileIcon } from "@/components/icons";
import { Container } from "@bitnation-dev/components";
import Image from "next/image";
import { useState, useEffect } from "react";
import Propiedades from "@/propertiesProp";
import Contactanos from "@/components/contactanos";



export default function Description() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [data, setData] = useState<Propiedades[]>([]);
    const [, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalImages = data[0]?.image.length || 0;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/properties');
                if (!response.ok) {
                    throw new Error('Error al cargar las propiedades');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchData();
    }, []);


    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? totalImages - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % totalImages
        );
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup cuando el componente se desmonte
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isModalOpen]);

    return (
        <>
            <Container>
                <div className="px-4 md:px-0">
                    <h1 className="text-[#0E87A2] text-2xl md:text-3xl">
                        {data.length > 0 ? data[0].location : "Ubicación no disponible"}
                    </h1>
                </div>
                <div className="flex flex-wrap gap-4 items-center px-4 md:px-0">
                    <h1 className="text-xl md:text-2xl text-[#3B4504] font-bold">{"US$" + formatted(data.length > 0 ? data[0].price : 0)}</h1>
                    <div className="flex items-center space-x-2">
                        <BathIcon />
                        <p className="text-sm text-gray-500">{data.length > 0 ? data[0].bathrooms : "0 Baths"} </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BedIcon />
                        <p className="text-sm text-gray-500 ">{data.length > 0 ? data[0].bedrooms : "0 Beds"}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ParkingIcon />
                        <p className="text-sm text-gray-500">{data.length > 0 ? data[0].parking : "0 Parking"}</p>
                    </div>
                    <div className=" flex space-x-4 py-4" >
                        <p className="text-sm text-black pt-2"> {data.length > 0 ? data[0].meters : "0 "} m2 </p>
                    </div>
                </div>
                <div className="flex border-t border-b border-gray-300 items-center mb-8 py-2 overflow-x-auto no-scrollbar">
                    <button className="text-sm md:text-base text-black p-2 md:p-4 hover:text-white hover:bg-black font-bold whitespace-nowrap">Descripcion</button>
                    <button className="text-black p-4 hover:text-white hover:bg-black font-bold whitespace-nowrap"> Ubicacion </button>
                    <button className="text-black p-4 hover:text-white hover:bg-black font-bold whitespace-nowrap"> Calculo de Prestamo </button>
                    <button className="text-black p-4 hover:text-white hover:bg-black font-bold whitespace-nowrap"> Proyectos Similares </button>
                </div>
            </Container>
            <Container>
                <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col space-y-2 w-full lg:w-3/4">
                        <div className="h-[50vh] flex justify-center items-center relative">
                            <div className="flex px-4 w-full justify-between">
                                <button className="z-10" onClick={handlePrevImage}>
                                    <ArrowButtonLeft />
                                </button>
                                <button className="z-10" onClick={handleNextImage}>
                                    <ArrowButtonRight />
                                </button>
                            </div>
                            <div className="absolute inset-0">
                                {loading ? (
                                    <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                                ) : (
                                    Array.isArray(data[0]?.image) && data[0].image[currentImageIndex] && (
                                        <Image
                                            src={data[0].image[currentImageIndex]}
                                            alt={`Imagen ${currentImageIndex}`}
                                            fill
                                            objectFit="cover"
                                            objectPosition="center"
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar">
                            <div className="flex space-x-1">
                                {loading ? (
                                    <div className="flex space-x-1">
                                        {Array.from({ length: 7 }).map((_, index) => (
                                            <div key={index} className="w-36 h-36 bg-gray-200 animate-pulse"></div>
                                        ))}
                                    </div>
                                ) : (
                                    Array.isArray(data[0]?.image) && data[0].image.map((image: string, index: number) => (
                                        <Image key={index} src={image} alt={`Imagen ${index}`} width={150} height={150} className="aspect-square object-cover" />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <Contactanos />
                    </div>
                </div>
            </Container>
            <Container>
                <div 
                    className="fixed bottom-4 right-4 z-50 lg:hidden cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <ProfileIcon />
                </div>
                {isModalOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-hidden"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div 
                            className="bg-white rounded-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                            <Contactanos />
                        </div>
                    </div>
                )}
                <div className="px-4 md:px-0">
                    <div className="pb-6">
                        <h1 className="text-black font-bold text-3xl md:text-4xl">Descripción</h1>
                        <p className="text-black">{data.length > 0 ? data[0].description : "No hay descripción disponible"}</p>
                    </div>
                    <div>
                        <h1 className="text-black font-bold text-3xl md:text-4xl">Ubicacion</h1>
                        <div className="mapContainer w-full">
                            {loading ? (
                                <div className="w-full h-[50vh] bg-gray-200 animate-pulse"/>
                            ) : (
                                <iframe
                                    width="100%"
                                    height="500"
                                    style={{ border: 0 }}
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps/embed/v1/place?${new URLSearchParams({
                                        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
                                        q: data.length > 0 ? data[0].location : "",
                                    })}`}
                                >
                                </iframe>
                            )}
                        </div>
                    </div>
                    <CalcPrestamo />
                    <div>
                        <h1 className="text-black text-2xl md:text-3xl font-bold">Proyectos similares</h1>
                        <div className="overflow-x-auto">
                            <div className="inline-flex space-x-4 py-4">
                                {Array.from(data).map((propiedad, index) => (
                                    <div key={index} className="min-w-[280px] md:min-w-[320px]">
                                        <Card 
                                            multimedia={propiedad.image[0]}
                                            price={propiedad.price}
                                            location={propiedad.location}
                                            bedrooms={propiedad.bedrooms}
                                            bathrooms={propiedad.bathrooms}
                                            parking={propiedad.parking}
                                            meters={propiedad.meters}
                                            operation={propiedad.operation}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

