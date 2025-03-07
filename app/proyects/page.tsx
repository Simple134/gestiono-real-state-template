'use client'
import { Grid, Container } from "@bitnation-dev/components";
import Card from "@/components/cards";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, FindIcon } from "@/components/icons";
import Filter from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import { Filters, PropertyType } from "@/propertyType";

export default function Proyects() {
  const pathname = usePathname()
  const pageName = <span style={{ color: '#9C9C78' }}>Inmuebles</span>
  const [data, setData] = useState<PropertyType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchLocation, setSearchLocation] = useState('');
  const [city, setCity] = useState('');
  const [, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const searchQuery = searchLocation;
  const cityQuery = city;
  const [filters, _setFilters] = useState<Filters>({
    propertyUsage: "buy",
    propertyTypes: [],
    propertyBedrooms: [],
    propertyBathrooms: [],
    propertyParking: [],
    propertyPriceMin: 0,
    propertyPriceMax: 0,
  });
  const setFilters = (filters: Partial<Filters>) => {
    _setFilters((prev) => ({ ...prev, ...filters }));
  };
  const {
    // propertyType: filteredPropertyType,
    propertyTypes: filteredPropertyTypes,
    propertyBedrooms: filteredPropertyBedrooms,
    propertyBathrooms: filteredPropertyBathrooms,
    propertyParking: filteredPropertyParking
  } = filters;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search') || '';
    const cityQuery = searchParams.get('search') || '';
    setSearchLocation(searchQuery);
    setCity(cityQuery);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties?page=${currentPage}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en la respuesta:', errorText);
          throw new Error(`Error al cargar las propiedades: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log(`Propiedades recibidas para página ${currentPage}:`, result.length);
        
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error completo:', error);
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredData = data.filter((propiedad) => {

    //const matchesPropertyPriceMin = propiedad.defaultCost >= filteredPropertyPriceMin;
    //const matchesPropertyPriceMax = propiedad.defaultCost <= filteredPropertyPriceMax;

    const matchesPropertyParking =
      filteredPropertyParking.length === 0 ||
      filteredPropertyParking.some(type =>
        propiedad.clientdata?.parking?.toLowerCase() === type.toLowerCase()
      );

    const matchesPropertyBathrooms =
      filteredPropertyBathrooms.length === 0 ||
      filteredPropertyBathrooms.some(type =>
        propiedad.clientdata?.bathrooms?.toLowerCase() === type.toLowerCase()
      );

    const matchesPropertyBedrooms =
      filteredPropertyBedrooms.length === 0 ||
      filteredPropertyBedrooms.some(type =>
        propiedad.clientdata?.bedrooms?.toLowerCase() === type.toLowerCase()
      );


    // Filtro de tipo de propiedad
    const matchesPropertyType =
      filteredPropertyTypes.length === 0 ||
      filteredPropertyTypes.some(type =>
        propiedad.clientdata?.propertyType?.toLowerCase() === type.toLowerCase()
      );

    // Filtro de ubicación
    const matchesLocation =
      searchLocation === '' ||
      propiedad.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      propiedad.clientdata?.address?.toString().toLowerCase().includes(searchLocation.toLowerCase());

    return matchesPropertyType && matchesLocation && matchesPropertyBedrooms && matchesPropertyBathrooms && matchesPropertyParking;
  });

  const paginatedData = filteredData;



  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log("Cambiando a página:", newPage);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
  };

  const handleRouter = (id: number) => {
    router.push(`/description?id=${id}`)
  }

  useEffect(() => {
    if (showMobileFilter) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showMobileFilter]);

  useEffect(() => {
    console.log(filteredData, currentPage)
  }, [filteredData, currentPage])

  useEffect(() => {
    console.log(`Página actual: ${currentPage}`);
    console.log(`Total de datos filtrados: ${filteredData.length}`);
    console.log(`Datos mostrados: ${paginatedData.length}`);
  }, [currentPage, filteredData, paginatedData]);

  return (
    < >
      <Grid columns={{ xl: 1, lg: 1, md: 1, sm: 1 }}>
        <Container className=" bg-cover h-[20dvh] " style={{ backgroundImage: "url('/imagen3.png')" }}>
          <div className="flex flex-col  text-white ">
            <div className="mb-4 hidden lg:block">
              <p className="font-['poppins']">
                Home &gt; {pathname === "/proyects" ? pageName : pathname}
              </p>
            </div>
            <h1 className="text-4xl font-bold font-['poppins'] uppercase">Inmuebles</h1>
          </div>
        </Container>

        <Grid columns={{ xl: 1, md: 1, sm: 1 }}>
          <Container>
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="hidden md:block text-black w-full md:w-auto mb-4 md:mb-0">
                <Filter
                  results={filteredData.length}
                  showMobileFilter={showMobileFilter}
                  filters={filters}
                  onFilterChange={(key) => (values) => setFilters({ [key]: values })}
                />
              </div>
              <div className="text-black w-full">
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                  <div className="flex justify-between items-center gap-2">
                    <button
                      onClick={() => setShowMobileFilter(!showMobileFilter)}
                      className="md:hidden flex items-center px-4 h-10 border-2 border-gray-500 hover:border-black bg-[#3B4504] text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      <span className="ml-2">Filtrar</span>
                    </button>

                    <div className="lg:hidden w-full h-10 text-black text-left px-2 border-2 border-gray-500 flex items-center hover:cursor-not-allowed justify-between">
                      <p>Ordenar Por:  </p>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="relative flex items-center gap-2">
                    <div className="absolute left-2 ">
                      <FindIcon />
                    </div>
                    <input
                      onChange={handleSearchChange}
                      type="text"
                      placeholder="Buscar por ciudad"
                      className="w-full h-10 pl-8 py-2 border-2 border-gray-500 bg-white text-black" />
                  </div>
                  <div className="hidden lg:flex flex-row items-center justify-between w-full h-10 border-2 border-gray-500 px-2 cursor-not-allowed">
                    <p>Ordenar Por:  </p>
                    <ArrowDownIcon />
                  </div>
                </div>

                <h1 className="text-2xl font-bold pt-4 pl-4">
                  {searchQuery || cityQuery
                    ? `RESULTADOS PARA "${searchQuery.toUpperCase() || cityQuery.toUpperCase()}"`
                    : "INMUEBLES "}
                </h1>
                <Grid columns={{ xl: 3, md: 2, sm: 1 }}>
                  {loading ? (
                    <div className="flex flex-col gap-4">
                      {Array.from({ length: 1 }).map((_, index) => (
                        <div key={index} className="animate-pulse flex flex-col space-y-4 p-4 border ">
                          <div className="bg-gray-300 h-72 w-[95%] "></div>
                          <div className="bg-gray-300 h-6 w-3/4"></div>
                          <div className="bg-gray-300 h-6 w-[95%]  "></div>
                        </div>
                      ))}
                    </div>
                  ) : filteredData.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center py-10">
                      <p className="text-xl text-gray-600 font-semibold">
                        {searchQuery === '' || cityQuery === ''
                          ? "No hay datos disponibles"
                          : `No se encontraron resultados para "${searchQuery.toUpperCase() || cityQuery.toUpperCase()}"`
                        }
                      </p>
                    </div>
                  ) : (
                    paginatedData.map((propiedad: PropertyType) => (
                      <Card
                        key={propiedad?.id}
                        id={propiedad?.id}
                        multimedia={propiedad?.image[0]}
                        price={propiedad?.sellPrice}
                        currency={propiedad?.sellPriceCurrency}
                        location={propiedad?.clientdata?.address}
                        bedrooms={propiedad?.clientdata?.bedrooms}
                        bathrooms={propiedad?.clientdata?.bathrooms}
                        parking={propiedad?.clientdata?.parking}
                        squareMeters={propiedad?.clientdata?.squareMeters}
                        onClick={() => handleRouter(propiedad.id)}
                      />
                    ))
                  )}
                </Grid>
              </div>
            </div>
            <div className="flex flex-wrap w-full justify-center md:justify-end py-10 md:py-20 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 border text-black hover:border-2 hover:border-black cursor-pointer ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentPage <= 1}
              >
                <ArrowLeftIcon />
              </button>
                <button
                  key={currentPage}
                  onClick={() => handlePageChange(currentPage)}
                  className={`px-4 border hover:border-2 hover:border-black text-black ${currentPage === currentPage ? 'font-bold bg-gray-200' : ''}`}
                >
                  {currentPage}
                </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 border text-black hover:border-2 hover:border-black cursor-pointer ${currentPage >= filteredData.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={filteredData.length === 0}
              >
                <ArrowRightIcon />
              </button>
            </div>
          </Container>
        </Grid>
      </Grid>
      <AnimatePresence>
        {showMobileFilter && (
          <>
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 h-full w-80 z-50 md:hidden text-black"
            >
              <Filter
                results={filteredData.length}
                showMobileFilter={showMobileFilter}
                filters={filters}
                onFilterChange={(key) => (values) => setFilters({ [key]: values })}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-[100dvh] bg-black z-40 md:hidden"
              onClick={() => setShowMobileFilter(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
