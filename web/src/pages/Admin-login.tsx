import { useState,useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Form";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();  // change route

  const { isLoggedIn, setIsLoggedIn } = useAuth()!;

  // ถ้าล็อกอินแล้วอยู่หน้า /admin จะ Redirect ไปหน้าแรก
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/show");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (username: any, password: any) => {
    fetch('http://localhost:5001/login', {
      method: 'POST',
      credentials: 'include', // ส่ง cookie ไปด้วย
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Login result:", data);
        if (data.message) {
          alert("Login successful!");
          setIsLoggedIn(true);
          // localStorage.setItem("isLoggedIn", "true");
          console.log("localStorage after login:", localStorage.getItem("isLoggedIn")); // Debug
          // navigate("/show")
        } else {
          alert("Login failed: " + (data.error || "Unknown error"));
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
      });
  };

  // const handleLogout = () => {
  //   fetch('http://localhost:5001/logout', {
  //     method: 'POST',
  //     credentials: 'include', // ส่ง cookie ไปด้วย
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("Logout result:", data);
  //       if (data.message) {
  //         alert("Logout successful!");
  //         localStorage.removeItem("isLoggedIn");
  //         setLoggedIn(false)
  //         navigate("/");
  //       } else {
  //         alert("Logout failed: " + (data.error || "Unknown error"));
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error during logout:", error);
  //     });
  // };

  return (
    <div className="flex flex-grow items-center justify-center p-6">
            <div className="w-full h-full">
    <div className="flex flex-col items-center justify-center w-full h-full">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        // ถ้าล็อกอินแล้ว
        <p className="text-xl font-semibold">You are already logged in</p>
      )}
    </div>
    </div>
    </div>
  );
};

export default AdminLogin;
