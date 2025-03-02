import { useState } from "react";
import LoginForm from "../components/Form";

const AdminLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
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
          setLoggedIn(true);
          // สามารถเพิ่มการ redirect หรือเก็บข้อมูลเพิ่มเติมได้ที่นี่
        } else {
          alert("Login failed: " + (data.error || "Unknown error"));
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
      });
  };

  const handleLogout = () => {
    fetch('http://localhost:5001/logout', {
      method: 'POST',
      credentials: 'include', // ส่ง cookie ไปด้วย
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Logout result:", data);
        if (data.message) {
          alert("Logout successful!");
          setLoggedIn(false);
        } else {
          alert("Logout failed: " + (data.error || "Unknown error"));
        }
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div>
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
