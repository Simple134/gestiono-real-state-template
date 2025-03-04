import Image from "next/image";
import InfoInput from "./input";
import {  ButtonWhatsapp } from "./button";

const Contactanos = ({ propertyId, propertyName, propertyUrl }: { propertyId: number; propertyName: string; propertyUrl: string }) => {
    return (
        <div className="flex flex-col space-y-2 px-2 sm:px-4 w-full  mt-4 lg:mt-0 py-4">
            <h1 className="text-xl sm:text-2xl font-bold text-black">CONTACTOS</h1>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-black overflow-auto pt-2 no-scrollbar lg:overflow-hidden">
                    <Image
                        src="/imagenP.png"
                        alt="Foto de perfil de Miguel A. Nova"
                        width={90}
                        height={90}
                        objectFit="cover"
                        objectPosition="top"
                    />
                </div>
                <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-black">
                        Miguel A. Nova
                    </h2>
                    <p className="text-sm text-black">
                        Broker Inmobiliario
                    </p>
                    <p className="text-sm text-blue-500 cursor-pointer">
                        a.nova@emira.com.do
                    </p>
                </div>
            </div>
            <InfoInput propertyId={propertyId} propertyName={propertyName} propertyUrl={propertyUrl} />
            <ButtonWhatsapp text="Contáctanos" />
        </div>





    )
}

export default Contactanos;