// src/services/authService.ts

export const login = async (username: string, password: string): Promise<boolean> => {
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };
  