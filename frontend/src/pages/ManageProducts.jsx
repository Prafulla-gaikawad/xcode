import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { clearSelected } from "../store/productSlice";

const ManageProducts = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { selected } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Open drawer for add or edit
  const handleAdd = () => {
    dispatch(clearSelected());
    setDrawerOpen(true);
  };
  React.useEffect(() => {
    if (selected) setDrawerOpen(true);
  }, [selected]);

  // Close drawer
  const handleClose = () => {
    setDrawerOpen(false);
    dispatch(clearSelected());
  };

  return (
    <section className="pt-10 pb-10 w-full">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6 px-8">
        <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
          Manage Products
        </h1>
        <button
          className="bg-blue-900 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={handleAdd}
        >
          Add New Product
        </button>
      </div>
      {/* Product grid */}
      <div className="px-8">
        <ProductList manageMode onEdit={() => setDrawerOpen(true)} />
      </div>
      {/* Drawer/modal overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
            onClick={handleClose}
          />
          {/* Drawer */}
          <div className="ml-auto w-full max-w-md h-full bg-white shadow-xl p-8 overflow-y-auto relative z-50 animate-slideInRight">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6">
              {selected ? "Edit Product" : "Add New Product"}
            </h2>
            <ProductForm onSuccess={handleClose} />
          </div>
        </div>
      )}
      {/* Drawer animation */}
      <style>{`
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ManageProducts;
