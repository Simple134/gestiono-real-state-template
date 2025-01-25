"use client"

import { Button1, ButtonMail, ButtonWhatsapp } from "@/components/button"
import { MainIcon, MainIconBig } from "@/components/icons"
import Profile from "@/components/profile"
import { Column, Container, Grid } from "@bitnation-dev/components"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"


const AboutUs = () => {

    const pathname = usePathname()
    const pageName = <span style={{ color: '#9C9C78' }}>NOSOTROS</span>

    const handleMapClick = () => {
        const address = "Santiago" // Usa la misma ubicación que en el iframe
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
        window.open(mapsUrl, '_blank')
    }
        const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:emiragroupinfo@gmail.com?subject=Nuevo mensaje de contacto&body=Nombre: ${formData.nombre}%0D%0AEmail: ${formData.email}%0D%0AMensaje: ${formData.mensaje}`;
        window.location.href = mailtoLink;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Container >
                <div className="hidden lg:block">
                    <p className="text-black font-['poppins'] font-light">
                        Home &gt; {pathname === "/aboutus" ? pageName : pathname}
                    </p>
                </div>
                <div>
                    <h1 className="text-3xl text-black font-bold font-['Poppins'] py-4">
                        NOSOTROS
                    </h1>
                </div>
            </Container>
            <Container className="bg-cover container-inside" style={{ backgroundImage: "url('/imageCover.png')" }}>
                <div className="h-[90dvh] lg:h-[55dvh] flex flex-col  justify-between" >
                    <div className="flex flex-col p-2 lg:justify-center lg:h-full lg:mt-20 ">
                        <h1 className="text-[#9C9C78] text-4xl font-bold uppercase pb-4 lg:text-4xl">¿Quienes Somos?</h1>
                        <div className="lg:w-[30vw]">
                            <p className="text-md font-bold lg:text-xl">
                                Emira Group es una empresa inmobiliaria dedicada a ofrecer soluciones excepcionales en la compra, venta y alquiler de propiedades.
                            </p>
                        </div>
                        <div className="mt-4">
                            <Button1 text="Hablemos" icon />
                        </div>
                    </div>
                    <div className="lg:flex lg:items-end lg:justify-end lg:mb-20 hidden lg:block ">
                        <MainIconBig />
                    </div>
                    <div className="flex items-end justify-end lg:mb-20 block lg:hidden">
                        <MainIcon />
                    </div>
                </div>
            </Container>

            {/*<Container className="mb-10">
                <Column columns={{ xl: { width: 5 }, md: { width: 1 }, sm: { width: 1 } }}>
                    <div className="flex justify-center py-4">
                        <h1 className="text-black text-2xl uppercase font-bold">Nuestros Clientes Dicen:</h1>
                    </div>
                    <div className="inline-flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <CardComment key={index} />
                        ))}
                    </div>
                </Column>
            </Container>*/}
            <Container className="mb-10">
                <Column columns={{ xl: { width: 5 }, md: { width: 1 }, }}>
                    <div className="flex flex-col lg:items-center lg:justify-center">
                        <h1 className="text-4xl text-black font-bold pb-4">
                            Nuestro Equipo
                        </h1>
                        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
                            {Array.from({ length: 1 }).map((_, index) => (
                                <Profile key={index} />
                            ))}
                        </div>
                    </div>
                </Column>
            </Container>
            <Container className="mb-10">
                <Column columns={{ xl: { width: 5 }, md: { width: 1 }, }}>
                    <div className="pb-12">
                        <h1 className="text-2xl text-black font-bold flex justify-center uppercase pb-4">
                            Nuestra Oficina
                        </h1>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                <Image src={"/imagenH.png"} alt="" width={700} height={500} className="w-full h-auto" />
                            </div>
                            <div className="hidden md:block lg:block w-1/2">
                                <div className="mapContainer w-full">
                                    <iframe
                                        width="100%"
                                        height="465"
                                        style={{ border: 0 }}
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={`https://www.google.com/maps/embed/v1/place?${new URLSearchParams({
                                            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
                                            q: "Santiago",
                                        })}`}
                                    >
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center pb-4">
                        <Button1
                            text="¿Cómo llegar?"
                            icon
                            onClick={handleMapClick}
                        />
                    </div>
                </Column>
            </Container>
            <Column columns={{ xl: { width: 5 }, md: { width: 1 }, sm: { width: 1 } }}>
                <Container className="bg-[#F5F5F5] [&>.container-inside]:!p-0 mt-10 mb-16">
                    <div>
                        <Grid columns={{ xl: 2, md: 1, sm: 1 }}>
                            <div className="flex flex-col order-1 md:order-none">
                                <div className="flex justify-center items-center -mt-10">
                                    <Image
                                        src="/imagenP.png"
                                        alt="image"
                                        width={425}
                                        height={425}
                                        quality={100}
                                        className="w-full md:w-auto"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-center py-6 md:hidden text-[#3B4504] ">
                                    Asesoría Gratis
                                </h2>
                                <p className="text-md text-[#757575] pl-4 md:hidden ">Elimina dudas o busca donde invertir con la asistencia de un experto en inversiones inmobiliarias</p>
                            </div>
                            <div className="flex justify-center items-center order-2 md:order-none">
                                <div className="w-full px-4 md:px-0">
                                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full px-4 md:px-0">
                                        <div className="w-full">
                                            <h2 className="text-lg font-semibold mb-2 text-black">Nombre</h2>
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                placeholder="Nombre"
                                                className="w-full px-3 py-2 border rounded-md text-black"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h2 className="text-lg font-semibold mb-2 text-black">Email</h2>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="tu@email.com"
                                                className="w-full px-3 py-2 border rounded-md text-black"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h2 className="text-lg font-semibold text-black">Mensaje</h2>
                                            <textarea
                                                name="mensaje"
                                                value={formData.mensaje}
                                                onChange={handleChange}
                                                placeholder="Estoy interesado en este proyecto..."
                                                className="w-full px-3 py-2 border rounded-md text-black"
                                                rows={4}
                                            ></textarea>
                                        </div>
                                        <div className="flex space-x-2 ">
                                        <ButtonMail text="Enviar Mensaje" type="submit" visible={true}/>
                                        <ButtonWhatsapp text="Contáctanos" />
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </Grid>
                    </div>
                </Container>
            </Column>
        </>
    )
}

export default AboutUs
