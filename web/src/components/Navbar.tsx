import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/logoutService";
import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Modal from "./Modal"
interface LinkItem {
  path: string;
  name: string;
}

const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()!;
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleLogout = async () => {
    await logout().catch((error) => console.error("Logout failed", error));
    setIsLoggedIn(false);
    navigate("/");
  };

  const links = useMemo<LinkItem[]>(() => {
    return isLoggedIn
      ? [
        { path: "/", name: "Upload Image" },
        { path: "/ip-camera", name: "IP Camera" },
        { path: "/show", name: "Show Image" },
        { path: "/about", name: "About us" },
      ]
      : [
        { path: "/", name: "Upload Image" },
        { path: "/about", name: "About us" },
      ];
  }, [isLoggedIn]);

  return (
    <div>
      <nav className="relative bg-[#2354E6] shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-20 flex items-center justify-between">
            <div className="text-white text-xl font-bold">
              <Link to="/" className="text-white text-xl font-bold">
                COE-ACCESS-CONTROL
              </Link>
            </div>

            <div className="hidden min-[901px]:flex space-x-6">
              {links.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${location.pathname === item.path
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-white hover:bg-white hover:text-blue-600"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 rounded-lg transition duration-300 text-white bg-red-500 hover:text-white cursor-pointer flex items-center"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-lg transition duration-300 text-white bg-blue-500 hover:text-white cursor-pointer flex items-center"
                >
                  Admin
                </Link>
              )}
            </div>

            <div className="flex min-[901px]:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                {isOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col items-center absolute top-20 right-0 w-full bg-[#2354E6] px-4 pt-2 pb-4 space-y-2 shadow-lg rounded-b-lg min-[867px]:hidden z-50">
            {links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition duration-300 ${location.pathname === item.path
                  ? "bg-white text-blue-600 shadow-md w-full text-center"
                  : "text-white hover:bg-white hover:text-blue-600"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => setShowModal(true)}
                className="w-full px-4 py-2 rounded-lg  text-center duration-300 text-white bg-red-500 hover:text-white cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-2 rounded-lg transition duration-300 text-white bg-blue-500 hover:text-white cursor-pointer"
              >
                Admin
              </Link>
            )}
          </div>
        )}
      </nav>
      <div className="flex justify-center items-center">
        <Modal
          isOpen={showModal}
          iconName="warning"
          title="Are you sure"
          text="you want to logout?"
          confirmButtonText="OK"
          cancelButtonText="Cancel"
          onConfirm={() => {
            handleLogout();
            setShowModal(false);
          }}
          onCancel={() => {
            setShowModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;