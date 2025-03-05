import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadImage from "./pages/UploadImage";
import ShowImage from "./pages/ShowImage";
import About from "./pages/About";
import AdminLogin from "./pages/Admin-login";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Navbar />
              <Routes>
                <Route path="/" element={<UploadImage />} />
                <Route path="/show" element={<ShowImage />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<AdminLogin />} />
              </Routes>
            </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
