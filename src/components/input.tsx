import React, { useState } from 'react';
import { ButtonMail } from './button';

const InfoInput = () => {
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
            <ButtonMail text="Enviar Mensaje" type="submit"/>
        </form>
    );
};

export default InfoInput;

