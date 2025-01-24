import { ArrowRightMiniIcon, MailIcon, WhatsappIcon } from "./icons"

interface ButtonProps {
    text?: string;
    icon?: boolean;
    onClick?: () => void;
}

export const Button1 = ({ text, icon, onClick }: ButtonProps) => {
    return (
        <div className="flex py-4">
        <div className="bg-[#3B4504] font-bold text-white px-4 py-2 flex items-center cursor-pointer " onClick={onClick}>
            <p className="mr-2 whitespace-nowrap">{text}</p>
            {icon && <ArrowRightMiniIcon />}
        </div>
    </div>
    )
}


export const ButtonMail = ({ text, onClick  }: ButtonProps) => {
    return (
        <button className="bg-[#9C9C78] text-white px-4 py-2 flex items-center cursor-pointer space-x-4 h-12 justify-center"  onClick={onClick}>
            <MailIcon /> 
            <p>{text}</p>
        </button>
    )
}

export const ButtonWhatsapp = ({ text, onClick }: ButtonProps) => {
    const phoneNumber = "8495198432";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    const handleWhatsAppClick = () => {
        if (onClick) onClick();
    };

    return (
        <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#60D669] text-white px-4 py-2 flex items-center cursor-pointer space-x-4 h-12 justify-center" 
            onClick={handleWhatsAppClick}
        > 
            <WhatsappIcon />
            <p>{text}</p>
        </a>       
    )
}

