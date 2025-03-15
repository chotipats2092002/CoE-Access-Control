import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Form";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/loginService"


const AdminLogin = () => {
  const navigate = useNavigate();  // change route
  const { isLoggedIn, setIsLoggedIn } = useAuth()!;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/show");
    }
  }, [isLoggedIn, navigate]);


  const handleLogin = async (username: string, password: string) => {
    const loginSuccess = await login(username, password);
    if (loginSuccess) {
      setIsLoggedIn(true);
    }
    return loginSuccess;
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen pt-20">
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
    </div>
  );
};

export default AdminLogin;
