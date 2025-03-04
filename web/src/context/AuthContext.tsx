import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // ถ้า state เปลี่ยน ให้ sync ไป localStorage ด้วย
  const handleSetLoggedIn = (val: boolean) => {
    setIsLoggedIn(val);
    localStorage.setItem('isLoggedIn', val ? 'true' : 'false');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: handleSetLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
