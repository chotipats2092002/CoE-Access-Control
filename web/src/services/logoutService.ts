

export const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include', // ส่ง cookie ไปด้วย
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Logout result:", data);
      return data;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };
  