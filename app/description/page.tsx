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
      defaultCost: properties?.defaultCost || 0,
      description: properties?.description || "",
      image: properties?.multimedia?.map((media: {url: string}) => media.url) || [],
      clientdata:{
        //@ts-ignore
        address: properties?.clientdata?.location || 'Punta Cana',
        //@ts-ignore
        bathrooms: properties?.clientdata?.bathrooms,
        //@ts-ignore
        bedrooms: properties?.clientdata?.bedrooms,
        //@ts-ignore
        parking: properties?.clientdata?.parking,
        //@ts-ignore
        propertyType: properties?.clientdata?.propertyType,
      }

    };

    return <Description data={data} />
}
