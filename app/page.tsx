'use client'
import { Container, Grid } from "@bitnation-dev/components";
import { SearchIcon } from "@/components/icons";
import Card from "@/components/cards";
import Image from "next/image";
import CityCard from "@/components/cityCard";
import { Button1, ButtonMail, ButtonWhatsapp } from "@/components/button";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import InfoInput from "@/components/input";
import { MainIcon } from "@/components/icons";
import Link from 'next/link';
import { PropertyType } from "@/propertyType";
import { useStore } from "@/components/store";

export default function Home() {
    const [data, setData] = useState<PropertyType[]>([]);
    const [, setError] = useState<string | null>(null);
    const [infoInput, setInfoInput] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const {  setMoreProperties } = useStore()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/properties');
                if (!response.ok) {
                    throw new Error('Error al cargar las propiedades');
                }
                const result = await response.json();
                setData(result);
                setMoreProperties(result)
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchData();
    }, [setMoreProperties]);


    const handleInfoInput = () => {
        setInfoInput(!infoInput);
    }

    const handleRouter = (id: number) => {
        router.push(`/description?id=${id}`)
    }

    const handleSearch = () => {
        if (searchTerm.trim()) {
            router.push(`/proyects?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleCitySearch = (name: string) => {
        router.push(`/proyects?search=${encodeURIComponent(name.trim())}`);
    };

    return (
        <>
            <Container style={{ 
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0) 20%), url('/imageCover.png')`
                }} 
                className="bg-cover h-[90lvh]">
                {pathname === "/" && (
                    <div className="flex justify-between text-white h-full w-full !p-0 !m-0 ">
                        <div className="cursor-pointer" onClick={() => router.push("/")}>
                            <MainIcon />
                        </div>

                        <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                ) : (
                                    <path fillRule="evenodd" d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 4a1 1 0 100 2h14a1 1 0 100-2H5z" clipRule="evenodd" />
                                )}
                            </svg>
                        </button>

                        <div className={`
                    md:flex md:space-x-4 
                    absolute md:relative top-16 md:top-0 
                    right-0 md:right-auto 
                    w-28 md:w-auto 
                    md:bg-transparent
                    ${isMenuOpen ? 'flex' : 'hidden'}
                    flex-col md:flex-row
                    md:items-center
                    py-4
                    px-4 md:px-0
                    md:py-0
                    space-y-4 md:space-y-0 z-50
                `}>
                            <Link href="/" className={`hover:text-[#9C9C78] ${pathname === '/' ? "text-[#9C9C78]" : ""}`}>Home</Link>
                            <Link href="/proyects" className={`hover:text-[#9C9C78] `}>Inmuebles</Link>
                            <Link href="/aboutus" className={`hover:text-[#9C9C78] `}>Nosotros</Link>
                        </div>
                    </div>
                )}
                <div className="flex flex-col h-[70vh] w-full justify-center items-center space-y-6">
                    <span className=" text-center text-2xl lg:text-6xl font-bold uppercase hidden lg:block ">
                        Las mejores Inversiones <br /> Inmobiliarias
                    </span>
                    <span className=" text-center text-xl  font-bold uppercase block lg:hidden ">
                        Las mejores Inversiones Inmobiliarias
                    </span>
                    <div className="flex flex-col justify-center w-full max-w-2xl items-center px-4">
                        <p className="text-[#9C9C78] text-center text-sm">
                            Busca tu próximo proyecto para invertir con nosotros
                        </p>
                        <div className="flex justify-center items-center w-full mt-6 lg:pl-10">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Pais, Ciudad, Proyecto, ID, Zonas"
                                className="w-full h-16 px-4 py-2 border-2 border-[#9C9C78] bg-white text-[#9C9C78]"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <div 
                                onClick={handleSearch}
                                className="w-12 h-12 justify-center flex items-center border-2 border-[#9C9C78] relative right-14 bg-[#9C9C78] cursor-pointer hidden lg:flex"
                            >
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container className="h-[100vh] mt-10 overflow-x-auto md:h-[90vh] lg:h-[80vh]">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B4504] text-center sm:text-left">Proyectos Recomendados</h1>
                <div className="flex overflow-x-auto space-x-4 pb-4">
                    {loading || data.length === 0 ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex-shrink-0 w-72 animate-pulse flex flex-col space-y-4 p-4 border">
                                <div className="bg-gray-300 h-72 w-full"></div>
                                <div className="bg-gray-300 h-6 w-3/4"></div>
                                <div className="bg-gray-300 h-6 w-full"></div>
                            </div>
                        ))
                    ) : (
                        data.map((propiedad) => (
                            <div key={propiedad?.id} className="flex-shrink-0 w-72">
                                <Card
                                    id={propiedad?.id}
                                    currency={propiedad?.sellPriceCurrency}
                                    multimedia={propiedad?.image[0]}
                                    price={propiedad?.sellPrice}
                                    location={propiedad?.clientdata?.address}
                                    bedrooms={propiedad?.clientdata?.bedrooms}
                                    bathrooms={propiedad?.clientdata?.bathrooms}
                                    parking={propiedad?.clientdata?.parking}
                                    onClick={() => handleRouter(propiedad.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="flex justify-end mt-4">
                    <Button1 text="Mas Proyectos Similares" icon onClick={() => router.push('/proyects')} />
                </div>
            </Container>
            <Container className="bg-[#F5F5F5] [&>.container-inside]:!p-0 mt-10 sm:flex-col">
                <div >
                    <Grid columns={{ xl: 2, md: 1, sm: 1 }}>
                        <div className="flex justify-center items-center -mt-10 px-4" onClick={() => setInfoInput(false)}>
                            <Image
                                src="/imagenP.png"
                                alt="image"
                                width={425}
                                height={425}
                                quality={100}
                                className="w-full max-w-[425px] h-auto "
                            />
                        </div>
                        <div className="flex justify-center items-center px-4">
                            {infoInput ? (
                                <div className="w-full py-8">
                                    <InfoInput />
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-4 text-center !md:text-left sm:text-left">
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#3B4504] font-[Neco]">
                                        Asesoria Gratis
                                    </h1>
                                    <p className="text-xl md:text-2xl text-[#3B4504] text-left !md:text-justify sm:text-left font-thin">
                                        Elimina dudas o busca donde invertir <br /> con la asistencia de un experto en <br />
                                        inversiones inmobiliarias
                                    </p>
                                    <div className="flex space-x-4 py-4">
                                        <ButtonMail text="Contáctanos" onClick={handleInfoInput} visible={true} width="100%" />
                                        <ButtonWhatsapp text="Contáctanos" width="100%" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
            </Container>
            <Container>
                <div className="flex flex-col lg:justify-center lg:items-center space-y-4 py-12 md:py-24 px-4" >
                    <h1 className="text-3xl md:text-4xl font-bold text-[#3B4504] font-[Neco]  md:text-left sm:text-left">
                        Búsqueda por Ciudad
                    </h1>
                    <p className="text-xl md:text-2xl text-[#757575]  md:text-left sm:text-left font-[poppins]">
                        Busca proyectos en las ciudades con mayor crecimiento del país
                    </p>
                    <CityCard onClick={handleCitySearch} />
                    <Button1 text="Busca por Ciudad" icon onClick={() => router.push('/proyects')} color="primary"/>
                </div>
            </Container>
        </>
    )
}

