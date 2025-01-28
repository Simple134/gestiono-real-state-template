import { Gestiono } from "@bitnation-dev/management/dist/package/src/server";
import { NextRequest, NextResponse } from 'next/server';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (!process.env.GESTIONO_API_URL) {
      throw new Error('GESTIONO_API_URL is not defined');
    }
    const properties = await Gestiono.getResources() 
    console.log(properties, "properties");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = properties.map((property: any) => ({
      id: property?.id,
      title: property?.name,
      description: property?.description,
      price: property?.sellPrice,
      location: null,
      image: property?.multimedia.map((media: {url: string}) => media.url),
    }));
    console.log(data, "data");
    return NextResponse.json(data); 
  } catch (error) {
    console.error('Error al obtener las casas:', error);
    return NextResponse.json({ error: 'Error al obtener las casas' }, { status: 500 });
  }
}
