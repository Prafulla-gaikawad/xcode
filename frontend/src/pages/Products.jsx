import React from "react";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <section className="pt-10 pb-10 w-full">
      <div className="flex justify-between items-center mb-6 px-8">
        <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
          Product List
        </h1>
      </div>
      <div className="px-8 mb-4">
        <FilterBar />
      </div>
      <div className="px-8">
        <ProductList />
      </div>
    </section>
  );
};

export default Products;
