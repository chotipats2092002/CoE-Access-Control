import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Form";
import { useAuth } from "../context/AuthContext";
import log from "video.js/dist/types/utils/log";

const AdminLogin = () => {
  const navigate = useNavigate();  // change route

  const { isLoggedIn, setIsLoggedIn } = useAuth()!;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/show");
    }
  }, [isLoggedIn, navigate]);


  
  const handleLogin = async (username: any, password: any): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        credentials: 'include', // ส่ง cookie ไปด้วย
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      console.log("Login result:", data);
      if (data.message) {
        setIsLoggedIn(true);  // อัปเดต context
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };


  return (
    <div className="flex flex-grow items-center justify-center p-6">
      <div className="w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <p className="text-xl font-semibold">You are already logged in</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
