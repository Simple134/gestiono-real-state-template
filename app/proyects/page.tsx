'use client'
import { Grid, Container } from "@bitnation-dev/components";
import Card from "@/components/cards";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import Filter from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Propiedades from "@/propertiesProp";


const ITEMS_PER_PAGE = 12;

export default function Proyects() {
  const pathname = usePathname()
  const pageName = <span style={{ color: '#9C9C78' }}>Inmuebles</span>
  const [data, setData] = useState<Propiedades[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchLocation, setSearchLocation] = useState('');
  const [, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

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



    const filteredData = data.filter((propiedad) =>
      propiedad.title.toLowerCase().includes(searchLocation.toLowerCase())
    );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex); 

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(data.length / ITEMS_PER_PAGE)) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
    setCurrentPage(1); 
  };

  const handleRouter = (id: number) => {
    router.push(`/description?id=${id}`)
}


  return (
    < >
      <Grid columns={{ xl: 1, lg: 1, md: 1, sm: 1 }}>
        <Container className=" bg-cover" style={{ backgroundImage: "url('/imagen3.png')" }}>
          <div className="flex flex-col  text-white ">
            <div className="mb-4">
            <p className="font-['poppins']">
              Home &gt; {pathname === "/proyects" ? pageName : pathname}
            </p>
          </div>
          <h1 className="text-4xl font-bold font-['poppins']">Inmuebles</h1>
          </div>
        </Container>

          <Grid columns={{ xl: 1, md: 1, sm: 1 }}>
          <Container>
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="text-black w-full md:w-auto mb-4 md:mb-0">
                <Filter results={filteredData.length} showMobileFilter={showMobileFilter}/>
              </div>
              <div className="text-black w-full">
                <div className="flex flex-col gap-4 mb-4">
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

                    <div className="w-full md:w-auto h-10 text-black text-left pl-2 border-2 border-gray-500 flex items-center hover:cursor-pointer">
                      <p>Ordenar Por Reciente </p>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  <input 
                    onChange={handleSearchChange} 
                    type="text" 
                    placeholder="Buscar por ciudad" 
                    className="w-full h-10 px-4 py-2 border-2 border-gray-500 bg-white text-black" 
                  />
                </div>

                <div className={`md:hidden ${showMobileFilter ? 'block' : 'hidden'} mb-4`}>
                  <Filter results={filteredData.length} showMobileFilter={showMobileFilter}/>
                </div>

                <h1 className="text-2xl font-bold pt-4 pl-4">INMUEBLES DE SANTIAGO</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
                    
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
                ) : (
                     currentData.map((propiedad) => (
                        <Card
                            key={propiedad?.id}
                            multimedia={propiedad?.image[0]}
                            price={propiedad?.price}
                            location={propiedad?.location}
                            bedrooms={propiedad?.bedrooms}
                            bathrooms={propiedad?.bathrooms}
                            parking={propiedad?.parking}
                            meters={propiedad?.meters}
                            operation={propiedad?.operation}
                            onClick={() => handleRouter(propiedad.id)}
                        />
                    ))
                )}
              </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full justify-center md:justify-end py-10 md:py-20 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 border text-black hover:border-2 hover:border-black cursor-pointer"
              >
                <ArrowLeftIcon />
              </button>
              {[...Array(Math.ceil(data.length / ITEMS_PER_PAGE)).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-4 border hover:border-2 hover:border-black text-black ${
                    currentPage === page + 1 ? 'font-bold' : ''
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 border text-black hover:border-2 hover:border-black cursor-pointer"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </Container>
        </Grid>
      </Grid>
      {showMobileFilter && (
          <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setShowMobileFilter(false)}
          />
      )}
    </>
  );
};
