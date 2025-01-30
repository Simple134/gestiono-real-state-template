import { ArrowRightMiniIcon, MailIcon, WhatsappIcon } from "./icons"

interface ButtonProps {
    text?: string;
    icon?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    visible?: boolean;
    color?: "primary" | "secondary" 
    width?: string;
}

export const Button1 = ({ text, icon, onClick, color, width }: ButtonProps) => {
    return (
        <div className="flex py-4">
        <div className={`bg-[#3B4504] font-bold text-white px-4 py-2 flex items-center cursor-pointer ${color === "primary" ? "bg-[#3B4504]" : "bg-[#9C9C78]"}`} onClick={onClick} style={{ width: width }}>
            <p className="mr-2 whitespace-nowrap">{text}</p>
            {icon && <ArrowRightMiniIcon />}
        </div>
    </div>
    )
}


export const ButtonMail = ({ text, onClick, type, visible }: ButtonProps) => {
    return (
        <button className={`bg-[#9C9C78] text-white px-4 py-2 flex items-center cursor-pointer space-x-4 h-12 justify-center ${visible ? 'visible' : 'hidden'}`}  onClick={onClick} type={type}>
            <MailIcon /> 
            <p>{text}</p>
        </button>
    )
}

export const ButtonWhatsapp = ({ text, onClick, width }: ButtonProps) => {
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
            style={{ width: width }}
        > 
            <WhatsappIcon />
            <p>{text}</p>
        </a>       
    )
}

