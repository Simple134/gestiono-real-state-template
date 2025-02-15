"use client"
import { PropertyType } from "@/propertyType";
import { useContext, useState } from "react";
import { createContext } from "react";

interface Store {
    moreProperties: PropertyType[]
    setMoreProperties: (data: PropertyType[]) => void
}

const storeContext = createContext<Store | undefined>(undefined)

export const useStore = () => {
    const store = useContext(storeContext)
    if (!store) {
        throw new Error("useStore must be used within a StoreProvider")
    }
    return store
}

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [moreProperties, setMoreProperties] = useState<PropertyType[]>([])
    const store: Store = {
        moreProperties,
        setMoreProperties
    }
    
    return (
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
}
