import { Gestiono } from "@bitnation-dev/management/dist/package/src/server";
import { Description } from "./content";
import Propiedades from "@/propertiesProp";

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

    const data: Propiedades = {
      id: properties?.id,
      title: properties?.name,
      name: properties?.name,
      sellPrice: properties?.sellPrice || 0,
      price: properties?.sellPrice || 0,
      description: properties?.description || "",
      image: properties?.multimedia?.map((media: {url: string}) => media.url) || [],
      type: properties?.type,
      // @ts-expect-error not in type yet
      location: properties?.clientdata?.location || 'Punta cana',
      // @ts-expect-error not in type yet
      bathrooms: properties?.clientdata?.bathrooms,
      // @ts-expect-error not in type yet
      bedrooms: properties?.clientdata?.bedrooms,
      // @ts-expect-error not in type yet
      parking: properties?.clientdata?.parking,
      // @ts-expect-error not in type yet
      meters: properties?.clientdata?.meters,
      // @ts-expect-error not in type yet  
      operation: properties?.clientdata?.operation,
    };

    return <Description data={data} />
}
