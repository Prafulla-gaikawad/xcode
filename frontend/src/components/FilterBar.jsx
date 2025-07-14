import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/productSlice";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    const params = {};
    if (status !== "all") params.status = status;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    dispatch(fetchProducts(params));
  };

  React.useEffect(() => {
    handleFilter();
    // eslint-disable-next-line
  }, [status, startDate, endDate]);

  return (
    <div className="bg-white shadow-md rounded-xl px-6 py-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-blue-100">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-blue-500 text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-10.5 5.25h10.5"
            />
          </svg>
        </span>
        <label className="mr-2 font-semibold text-gray-700">Status:</label>
        <select
          className="input input-bordered border-blue-200 focus:border-blue-500 rounded-lg px-3 py-2 text-base"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-blue-500 text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2"
            />
          </svg>
        </span>
        <label className="mr-2 font-semibold text-gray-700">Start Date:</label>
        <input
          type="date"
          className="input input-bordered border-blue-200 focus:border-blue-500 rounded-lg px-3 py-2 text-base"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-blue-500 text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2"
            />
          </svg>
        </span>
        <label className="mr-2 font-semibold text-gray-700">End Date:</label>
        <input
          type="date"
          className="input input-bordered border-blue-200 focus:border-blue-500 rounded-lg px-3 py-2 text-base"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button
        className="ml-0 md:ml-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-5 py-2 rounded-lg shadow-sm border border-blue-200 transition"
        onClick={() => {
          setStatus("all");
          setStartDate("");
          setEndDate("");
        }}
        type="button"
      >
        Reset
      </button>
    </div>
  );
};

export default FilterBar;
