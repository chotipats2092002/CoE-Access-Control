import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadImage from "./components/UploadImage";
import ShowImage from "./components/ShowImage";
import About from "./components/About";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-grow items-center justify-center p-6">
          <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
            <Routes>
              <Route path="/" element={<UploadImage />} />
              <Route path="/show" element={<ShowImage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
