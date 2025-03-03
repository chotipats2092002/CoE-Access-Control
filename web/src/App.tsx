import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadImage from "./pages/UploadImage";
import ShowImage from "./pages/ShowImage";
import About from "./pages/About";
import AdminLogin from "./pages/Admin-login";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-grow items-center justify-center p-6">
          <div className="bg-white shadow-xl rounded-lg p-8 w-full h-full">
            <Routes>
              <Route path="/" element={<UploadImage />} />
              <Route path="/show" element={<ShowImage />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<AdminLogin />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
