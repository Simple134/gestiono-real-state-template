import React from 'react';




const InfoInput = () => {
    return (
        <div className="flex flex-col space-y-4 w-full px-4 md:px-0">
            <div className="w-full">
                <h2 className="text-lg font-semibold mb-2 text-black">Nombre</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="w-full">
                <h2 className="text-lg font-semibold mb-2 text-black">Email</h2>
                <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="w-full">
                <h2 className="text-lg font-semibold text-black">Mensaje</h2>
                <textarea
                    placeholder="Estoy interesado en este proyecto..."
                    className="w-full px-3 py-2 border rounded-md"
                    rows={4}
                ></textarea>
            </div>
        </div>
    )
}

export default InfoInput;

