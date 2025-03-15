import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadImage from "./pages/UploadImage";
import ShowImage from "./pages/ShowImage";
import About from "./pages/About";
import AdminLogin from "./pages/Admin-login";
import IPCamera from "./pages/IPCamera";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<UploadImage />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* Protect routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/ip-camera" element={<IPCamera />} />
              <Route path="/show" element={<ShowImage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
