import React from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

interface ProfileCardProp {
    name: string;
    position: string;
    imageURL: string;
    contacts: {
        facebook: string;
        github: string;
        instagram: string;
    };
    style?: string;
}

const ProfileCard: React.FC<ProfileCardProp> = ({ name, position, imageURL, contacts, style='bg-white' }) => {
    return (
        <div className="relative">
            {/* <div className="border border-gray-400 rounded-md bg-white p-16 relative z-20">1</div> */}
            <div className={`flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-80 relative z-20 ${style} `}>
                {/* Profile Picture */}
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
                    {imageURL ? (
                        <img src={imageURL} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-600 text-2xl font-bold">
                            {name[0]}
                        </div>
                    )}
                </div>

                {/* Name & Position */}
                <h2 className="mt-4 text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-500">{position}</p>

                {/* Social Icons */}
                <div className="mt-4 flex space-x-4">
                    {contacts.facebook && (
                        <a href={contacts.facebook} target="_blank" rel="noopener noreferrer">
                            <FaFacebook className={`w-6 h-6 text-gray-600 hover:text-blue-600 transition`} />
                        </a>
                    )}
                    {contacts.github && (
                        <a href={contacts.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="w-6 h-6 text-gray-600 hover:text-black transition" />
                        </a>
                    )}
                    {contacts.instagram && (
                        <a href={contacts.instagram} target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="w-6 h-6 text-gray-600 hover:text-pink-600 transition" />
                        </a>
                    )}
                </div>
            </div>
            {position =='Advisor' &&<div className="absolute -inset-1 rounded-md blur-md bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 z-10"></div> }
        </div>
    );
};

export default ProfileCard;