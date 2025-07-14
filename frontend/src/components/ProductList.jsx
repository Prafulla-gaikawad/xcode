import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setSelected,
  deleteProduct,
} from "../store/productSlice";

const ProductList = ({ manageMode }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-lg text-blue-500">
          Loading...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
    );
  }

  if (!items.length) {
    return (
      <div className="bg-gray-100 p-4 rounded text-center text-gray-500">
        No products found.
      </div>
    );
  }

  const handleEdit = (product) => {
    dispatch(setSelected(product));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await dispatch(deleteProduct(id));
    setDeletingId(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {items.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-lg p-4 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100"
        >
          <div className="h-48 flex items-center justify-center mb-3 bg-gray-50 rounded-xl overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="object-contain h-full w-full"
                onError={(e) => {
                  e.target.src = "/vite.svg";
                }}
              />
            ) : (
              <div className="text-gray-300 text-6xl">🖼️</div>
            )}
          </div>
          <h2
            className="font-bold text-lg text-gray-800 mb-1 truncate"
            title={product.title}
          >
            {product.title}
          </h2>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2 min-h-[40px]">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mb-2">
            {product.salePrice ? (
              <>
                <span className="text-gray-400 line-through text-base">
                  {product.price}
                </span>
                <span className="text-blue-700 font-bold text-lg">
                  {product.salePrice}
                </span>
              </>
            ) : (
              <span className="text-blue-700 font-bold text-lg">
                {product.price || ""}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-auto">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                product.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {product.status}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(product.date).toLocaleDateString()}
            </span>
          </div>
          {manageMode && (
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-1 rounded-lg font-semibold text-sm transition"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                className="bg-gray-800 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-semibold text-sm transition flex items-center"
                onClick={() => handleDelete(product._id)}
                disabled={deletingId === product._id}
              >
                {deletingId === product._id ? (
                  <span className="loading loading-spinner loading-xs mr-1"></span>
                ) : null}
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
