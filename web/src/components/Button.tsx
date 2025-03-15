import React, { FC } from "react";

type CaptureButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
};

const Button: FC<CaptureButtonProps> = ({ onClick, children, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`text-xl xl:text-base bg-[#2354E6] text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;