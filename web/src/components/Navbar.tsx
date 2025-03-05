import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // ดึงค่า isLoggedIn และฟังก์ชัน setIsLoggedIn จาก Context
  const { isLoggedIn, setIsLoggedIn } = useAuth()!; 
  const navigate = useNavigate();

  // ฟังก์ชัน logout
  const handleLogout = () => {
    setIsLoggedIn(false);  
      fetch('http://localhost:5001/logout', {
      method: 'POST',
      credentials: 'include', // ส่ง cookie ไปด้วย
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
    navigate("/");     
  };

  // เมนูพื้นฐาน
  const links = [
    { path: "/", name: "Upload Image" },
    { path: "/about", name: "About" },

  ];

  // ถ้าล็อกอินแล้ว แสดงเมนู Show Image
  if (isLoggedIn) {
    links.push({ path: "/ip-camera", name: "IP Camera"});
    links.push({ path: "/show", name: "Show Image" });
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg p-4">
      <div className="max-w-4xl mx-auto flex justify-end space-x-6">
        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              location.pathname === item.path
                ? "bg-white text-blue-600 shadow-md"
                : "text-white hover:bg-white hover:text-blue-600"
            }`}
          >
            {item.name}
          </Link>
        ))}

        {/* แสดงปุ่ม Logout เฉพาะตอนที่ล็อกอิน, ถ้าไม่ล็อกอินให้แสดงปุ่ม Admin */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        ) : (
          <Link to="/admin" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
