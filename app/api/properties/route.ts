import { PropertyType } from "@/propertyType";
import { Gestiono } from "@bitnation-dev/management/server";
import { unstable_noStore as noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const getProperties = async (page: number) => {
  try {
    noStore();
    if (!process.env.GESTIONO_API_URL) {
      throw new Error("GESTIONO_API_URL is not defined");
    }
    const properties = await Gestiono.v2GetResources({
      itemsPerPage: "10",
      page: page.toString(),
    });
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
        //@ts-expect-error-ignore
        squareMeters: property.clientdata?.squareMeters,
      },
    }));
    return { data, error: null };
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    return { 
      data: null, 
      error: {
        message: "Error al obtener las propiedades",
        details: (error as Error).message
      }
    };
  }
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') || '1';
  
    
    console.log(`Obteniendo propiedades para la página: ${page}`);
    
    const result = await getProperties(parseInt(page));
    
    if (result.error) {
      return NextResponse.json(result.error, { status: 500 });
    }
    
    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Error en el método GET:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
