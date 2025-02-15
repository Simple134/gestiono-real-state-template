export interface PropertyType{
    onClick?: () => void;
    id: number;
    name: string;
    description: string;
    defaultCost: number;
    image: string[];
    clientdata: {
      bathrooms: string;
      bedrooms: string;
      address: string;
      parking: string;
      propertyType: string;
    };
  };