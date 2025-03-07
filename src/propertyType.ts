export interface PropertyType{
    onClick?: () => void;
    id: number;
    name: string;
    description: string;
    sellPrice: number;
    sellPriceCurrency: string;
    image: string[];
    clientdata: {
      bathrooms: string;
      bedrooms: string;
      address: string
      parking: string;
      propertyType: string;
      squareMeters: string;
    };
  };

 export type Filters = {
  propertyUsage: "buy" | "rent";
  propertyTypes: string[];
  propertyBedrooms: string[];
  propertyBathrooms: string[];
  propertyParking: string[];
  propertyPriceMin: number;
  propertyPriceMax: number;
}