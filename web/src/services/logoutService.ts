

export const logout = async (): Promise<any> => {
    try {
      const response = await fetch('http://localhost:5001/logout', {
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
  