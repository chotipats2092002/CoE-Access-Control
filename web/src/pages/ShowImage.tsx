import { PureComponent, useEffect } from "react";
import Gallery from "../components/Gallery";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const ShowImage = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()!; 
  const navigate = useNavigate();

 useEffect(() => {
  if(!isLoggedIn) {
    navigate("/admin");
  }
 }, [])
 
   return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Image Gallery</h1>
        <Gallery />
      </div>
    );
  
}

export default ShowImage;