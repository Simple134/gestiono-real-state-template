import { Gestiono } from "@bitnation-dev/management/server";
import { Description } from "./content";
import { PropertyType } from "@/propertyType";

export default async function PropertyPage({
    searchParams
}: {
    searchParams: { id: string }
}) {
    const { id } = searchParams;
    const properties = await Gestiono.getResourceById(id)

    if (!properties) {
        return <div>Property not found</div>
    }


    const data: PropertyType = {
      id: properties?.id,
      name: properties?.name,
      sellPrice: properties?.sellPrice || 0,
      sellPriceCurrency: properties?.sellCurrency || "",
      description: properties?.description || "",
      image: properties?.multimedia?.map((media: {url: string}) => media.url) || [],
      clientdata:{
        //@ts-expect-error-ignore
        address: properties?.clientdata?.location || 'Punta Cana',
        //@ts-expect-error-ignore
        bathrooms: properties?.clientdata?.bathrooms,
        //@ts-expect-error-ignore
        bedrooms: properties?.clientdata?.bedrooms,
        //@ts-expect-error-ignore
        parking: properties?.clientdata?.parking,
        //@ts-expect-error-ignore
        propertyType: properties?.clientdata?.propertyType,
        //@ts-expect-error-ignore
        squareMeters: properties?.clientdata?.squareMeters,
      }

    };

    return <Description data={data} />
}
