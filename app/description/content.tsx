"use client";
import CalcPrestamo from "@/components/calcPrestamo";
import { formatted } from "@/components/formatted";
import {
  ArrowButtonLeft,
  ArrowButtonRight,
  BathIcon,
  BedIcon,
  ParkingIcon,
  ProfileIcon,
} from "@/components/icons";
import { Container } from "@bitnation-dev/components";
import Image from "next/image";
import { useState, useEffect } from "react";
import Contactanos from "@/components/contactanos";
import Card from "@/components/cards";
import { PropertyType } from "@/propertyType";
import { useStore } from "@/components/store";
import { usePathname } from "next/navigation";

export const Description = ({ data }: { data: PropertyType }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalImages = data?.image.length || 0;
  const { moreProperties } = useStore();
  const pathname = usePathname();

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const propertyUrl = typeof window !== 'undefined' 
  ? `${window.location.origin}${pathname}?id=${data.id}` 
  : pathname;

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);


  return (
    <>
      <Container>
        <div className="h-10 w-full">
          <h1 className="text-[#0E87A2] text-2xl">{data.name}</h1>
        </div>
        <div className="flex flex-wrap gap-4 items-center px-4 md:px-0">
          <h1 className="text-xl md:text-2xl text-[#3B4504] font-bold">
            {data.sellPriceCurrency + "$ " + formatted(data.sellPrice)}
          </h1>
          <div className="flex items-center space-x-2">
            <BathIcon />
            <p className="text-sm text-gray-500">
              {data?.clientdata?.bathrooms
                ? data?.clientdata?.bathrooms
                : "0 Baths"}{" "}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <BedIcon />
            <p className="text-sm text-gray-500 ">
              {data?.clientdata?.bedrooms
                ? data?.clientdata?.bedrooms
                : "0 Beds"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <ParkingIcon />
            <p className="text-sm text-gray-500">
              {data?.clientdata?.parking
                ? data?.clientdata?.parking
                : "0 Parking"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">
              {data?.clientdata?.squareMeters
                ? data?.clientdata?.squareMeters + " m2"
                : "0 m2"}
            </p>
          </div>
        </div>
        <div className="flex border-t border-b border-gray-300 items-center mb-8 py-2 overflow-x-auto no-scrollbar">
          <button
            className="text-sm md:text-base text-black p-2 md:p-4 hover:text-white hover:bg-black font-bold whitespace-nowrap"
            onClick={() => {
              const descriptionElement = document.getElementById("description");
              if (descriptionElement) {
                descriptionElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Descripcion
          </button>
          <button
            className="text-black p-4 hover:text-white hover:bg-black font-bold whitespace-nowrap"
            onClick={() => {
              const ubicacionElement = document.getElementById("ubicacion");
              if (ubicacionElement) {
                ubicacionElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Ubicacion
          </button>
          <button
            className="text-black p-4 hover:text-white hover:bg-black font-bold whitespace-nowrap"
            onClick={() => {
              const calculoPrestamoElement =
                document.getElementById("calculo-prestamo");
              if (calculoPrestamoElement) {
                calculoPrestamoElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Calculo de Prestamo
          </button>
          <button
            className="text-black p-4 hover:text-white hover:bg-black font-bold whitespace-nowrap"
            onClick={() => {
              const proyectosSimilaresElement = document.getElementById(
                "proyectos-similares"
              );
              if (proyectosSimilaresElement) {
                proyectosSimilaresElement.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
          >
            Proyectos Similares
          </button>
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
                {Array.isArray(data?.image) &&
                  data.image[currentImageIndex] && (
                    <Image
                      src={data.image[currentImageIndex]}
                      alt={`Imagen ${currentImageIndex}`}
                      fill
                      objectFit="cover"
                      objectPosition="center"
                    />
                  )}
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <div className="flex space-x-1">
                {Array.isArray(data?.image) &&
                  data.image.map((image: string, index: number) => (
                    <div
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative cursor-pointer border-2 ${
                        index === currentImageIndex
                          ? " border-black  "
                          : "border-transparent"
                      }`}
                      key={`image-${image}`}
                    >
                      <Image
                        src={image}
                        alt={`Imagen ${image}`}
                        width={150}
                        height={150}
                        className="aspect-square object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
          <Contactanos propertyId={data.id} propertyName={data.name} propertyUrl={propertyUrl} />
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
              <Contactanos propertyId={data.id} propertyName={data.name} propertyUrl={propertyUrl} />
            </div>
          </div>
        )}
        <div className="px-4 md:px-0">
          <article className="pb-6 w-[69%] text-pretty" id="description">
            <h1 className="text-black font-bold text-3xl md:text-4xl">
              Descripción
            </h1>
            <p className="text-black ">
              {data.description
                ? data.description
                : "No hay descripción disponible"}
            </p>
          </article>
          <div id="ubicacion">
            <h1 className="text-black font-bold text-3xl md:text-4xl">
              Ubicacion
            </h1>
            <div className="mapContainer w-full">
              <iframe
                width="70%"
                height="500"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?${new URLSearchParams(
                  {
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
                    q: data?.clientdata?.address
                      ? data?.clientdata?.address
                      : "Punta Cana",
                  }
                )}`}
              ></iframe>
            </div>
          </div>
          <div id="calculo-prestamo">
            <CalcPrestamo />
          </div>
          <div
            id="proyectos-similares"
            className={`mb-10`} 
          >
            <h1 className="text-black text-2xl md:text-3xl font-bold ">
              Proyectos similares
            </h1>
            <div className="overflow-x-auto">
              <div className="flex gap-4 ">
                {moreProperties && moreProperties.length > 0 ? (
                  (() => {
                    const propiedadesFiltradas = moreProperties.filter(
                      (propiedad) => propiedad.id !== data.id && 
                      propiedad.clientdata.propertyType === data.clientdata.propertyType
                    );
                    
                    return propiedadesFiltradas.length > 0 ? (
                      propiedadesFiltradas.map((propiedad, id) => (
                        <div key={id} className="min-w-[280px] md:min-w-[320px]">
                          <Card
                            id={propiedad.id}
                            multimedia={propiedad?.image?.[0]}
                            price={propiedad.sellPrice}
                            currency={propiedad.sellPriceCurrency}
                            location={propiedad.clientdata?.address}
                            bedrooms={propiedad.clientdata?.bedrooms}
                            bathrooms={propiedad.clientdata?.bathrooms}
                            parking={propiedad.clientdata?.parking}
                            squareMeters={propiedad.clientdata?.squareMeters}
                          />
                        </div>
                      ))
                    ) : (
                        <p className="text-gray-500 text-2xl  text-center">
                          No hay proyectos similares disponibles
                        </p>
                    );
                  })()
                ) : (
                  <p className="text-gray-500 text-2xl  text-center">
                    No hay proyectos similares disponibles
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
