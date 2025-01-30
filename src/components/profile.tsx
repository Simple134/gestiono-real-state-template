import Image from "next/image"

const Profile = () => { 
    return (
        <div>
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-[340px] h-[380px] bg-gray-200 px-4 lg:w-[400px] lg:h-[480px] flex items-end justify-end">
                    <Image src={"/imagenP.png"} alt="Imagen de portada"  width={380} height={400}/>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-black text-[#3B4504] text-3xl font-[Neco]">Miguel A. Nova</h1>
                    <p className=" text-[#3B4504]  font-[Neco]">Broker Inmobilario</p>
                </div>
            </div>
        </div>
    )
}

export default Profile