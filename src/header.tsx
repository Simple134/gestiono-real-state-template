"use client"

import { useRouter } from "next/navigation";
import { MainIcon } from "./components/icons";
import { Container } from "@bitnation-dev/components"
import { usePathname } from "next/navigation";
import { useState } from "react";


const Header = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    if (pathname === "/") {
        return null
    }

    return (
        <Container className="bg-black !p-0 w-full !m-0">
            <div className="flex justify-between text-white h-full w-full !p-0 !m-0 ">
                <div className="cursor-pointer" onClick={() => router.push("/")}>
                    <MainIcon />
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        ) : (
                            <path fillRule="evenodd" d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 4a1 1 0 100 2h14a1 1 0 100-2H5z" clipRule="evenodd" />
                        )}
                    </svg>
                </button>

                <div className={`
                    md:flex md:space-x-4 
                    absolute md:relative top-16 md:top-0 
                    right-0 md:right-auto 
                    w-28 md:w-auto 
                    bg-black md:bg-transparent
                    ${isMenuOpen ? 'flex' : 'hidden'}
                    flex-col md:flex-row
                    md:items-center
                    py-4
                    px-4 md:px-0
                    md:py-0
                    space-y-4 md:space-y-0 z-50
                `}>
                    <a href="/" className={`hover:text-[#9C9C78] ${pathname === "/" ? "text-[#9C9C78]" : ""}`}>Home</a>
                    <a href="/proyects" className={`hover:text-[#9C9C78] ${pathname === "/proyects" ? "text-[#9C9C78]" : ""}`}>Inmuebles</a>
                    <a href="/aboutus" className={`hover:text-[#9C9C78] ${pathname === "/aboutus" ? "text-[#9C9C78]" : ""}`}>Nosotros</a>
                </div>
            </div>
        </Container>
    )
}

export default Header;