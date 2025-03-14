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
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;