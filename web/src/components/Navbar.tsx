import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg p-4">
      <div className="max-w-4xl mx-auto flex justify-end space-x-6">
        {[
          { path: "/", name: "Upload Image" },
          { path: "/show", name: "Show Image" },
          { path: "/about", name: "About" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              location.pathname === item.path
                ? "bg-white text-blue-600 shadow-md"
                : "text-white hover:bg-white hover:text-blue-600"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
