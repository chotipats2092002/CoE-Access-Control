import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuth()!; // ตรวจสอบสถานะการล็อกอิน

  return isLoggedIn ? <Outlet /> : <Navigate to="/admin" />;
};

export default PrivateRoute;
