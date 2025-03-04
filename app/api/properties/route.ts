import { PropertyType } from "@/propertyType";
import { Gestiono } from "@bitnation-dev/management/server";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (!process.env.GESTIONO_API_URL) {
      console.error("GESTIONO_API_URL no está definida en las variables de entorno");
      throw new Error("GESTIONO_API_URL is not defined");
    }
    
    if (!process.env.GESTIONO_API_KEY || !process.env.GESTIONO_API_SECRET) {
      console.error("Faltan credenciales de API en las variables de entorno");
      throw new Error("API credentials are missing");
    }
    
    console.log("Iniciando solicitud a Gestiono API...");
    
    const properties = await Gestiono.v2GetResources({
      itemsPerPage: "12",
      page: "1",
    });
    
    console.log(`Propiedades recibidas: ${properties.items.length}`);
    
    const data: PropertyType[] = properties.items.map((property) => ({
      id: property?.id,
      name: property?.name || '',
      description: property?.description || '',
      sellPrice: property?.sellPrice || 0,
      sellPriceCurrency: property?.sellPriceCurrency || '',
      image: property?.multimedia?.map((media: { url: string }) => media.url) || [],
      clientdata: {
        //@ts-expect-error-ignore
        propertyType: property.clientdata?.propertyType,
        //@ts-expect-error-ignore
        bathrooms: property.clientdata?.bathrooms,
        //@ts-expect-error-ignore
        bedrooms: property.clientdata?.bedrooms,
        //@ts-expect-error-ignore
        parking: property.clientdata?.parking,
        //@ts-expect-error-ignore
        address: property.clientdata?.address,
      },
    }));
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error detallado al obtener las propiedades:", error);
    
    // Devolver información más detallada sobre el error
    return NextResponse.json(
      { 
        error: "Error al obtener las propiedades", 
        details: (error as Error).message,
        stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
      },
      { status: 500 }
    );
  }
};
