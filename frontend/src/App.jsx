import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Toast from "./components/Toast";
import Products from "./pages/Products";
import ManageProducts from "./pages/ManageProducts";

function Navbar() {
  const location = useLocation();
  const navLinks = [
    { to: "/products", label: "Product List" },
    { to: "/products/manage", label: "Manage Products" },
  ];
  return (
    <header className="sticky top-0 z-30 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600 font-extrabold text-xl tracking-tight">
            Xcode
          </span>
          <span className="text-xs text-gray-400 ml-2">welcomes you</span>
        </div>
        <nav className="flex gap-4 mt-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-5 py-2 rounded-full font-semibold transition text-base
                ${
                  location.pathname === link.to
                    ? "bg-blue-100 text-blue-700 shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pb-12">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/manage" element={<ManageProducts />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
