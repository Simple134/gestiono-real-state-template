import { PropertyType } from "@/propertyType";
import { Gestiono } from "@bitnation-dev/management/server";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (!process.env.GESTIONO_API_URL) {
      throw new Error("GESTIONO_API_URL is not defined");
    }
    const properties = await Gestiono.v2GetResources({
      itemsPerPage: "12",
      page: "1",
    });
    const data: PropertyType[] = properties.items.map((property) => ({
      id: property?.id,
      name: property?.name || '',
      description: property?.description || '',
      price: property?.defaultCost || 0,
      defaultCost: property?.defaultCost || 0,
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
    console.error("Error al obtener las casas:", error);
    return NextResponse.json(
      { error: "Error al obtener las casas" },
      { status: 500 }
    );
  }
};
