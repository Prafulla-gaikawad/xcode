import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  clearStatus,
  setSelected,
  clearSelected,
} from "../store/productSlice";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  date: z.string().optional(),
  image: z
    .any()
    .refine(
      (fileList) =>
        !fileList ||
        fileList.length === 0 ||
        (fileList[0] &&
          ["image/jpeg", "image/png", "image/jpg"].includes(fileList[0].type) &&
          fileList[0].size <= 2 * 1024 * 1024),
      "Image must be .jpg, .jpeg, .png and <= 2MB"
    )
    .optional(),
});

const ProductForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error, success, selected } = useSelector(
    (state) => state.products
  );
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: "active",
      date: "",
      image: undefined,
    },
  });

  // Watch image for preview
  const imageFile = watch("image");
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      setImagePreview(URL.createObjectURL(file));
    } else if (selected && selected.image) {
      setImagePreview(selected.image);
    } else {
      setImagePreview(null);
    }
    return () => imagePreview && URL.revokeObjectURL(imagePreview);
    // eslint-disable-next-line
  }, [imageFile, selected]);

  // Populate form for editing
  useEffect(() => {
    if (selected) {
      setValue("title", selected.title || "");
      setValue("description", selected.description || "");
      setValue("status", selected.status || "active");
      setValue("date", selected.date ? selected.date.slice(0, 10) : "");
      setImagePreview(selected.image || null);
    } else {
      reset();
      setImagePreview(null);
    }
    // eslint-disable-next-line
  }, [selected, setValue, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("status", data.status);
    if (data.date) formData.append("date", data.date);
    if (data.image && data.image[0]) formData.append("image", data.image[0]);
    if (selected) {
      dispatch(updateProduct({ id: selected._id, formData })).then((res) => {
        if (!res.error) {
          reset();
          setImagePreview(null);
          dispatch(clearSelected());
          if (onSuccess) onSuccess();
        }
      });
    } else {
      dispatch(createProduct(formData)).then((res) => {
        if (!res.error) {
          reset();
          setImagePreview(null);
          if (onSuccess) onSuccess();
        }
      });
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearStatus()), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block mb-1 font-semibold text-gray-700 text-base">
          Title *
        </label>
        <input
          type="text"
          {...register("title")}
          className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-lg placeholder-gray-400 transition"
          placeholder="Enter product title"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700 text-base">
          Description
        </label>
        <textarea
          {...register("description")}
          className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-base placeholder-gray-400 transition resize-none min-h-[80px]"
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700 text-base">
          Status *
        </label>
        <select
          {...register("status")}
          className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-base transition"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700 text-base">
          Date
        </label>
        <input
          type="date"
          {...register("date")}
          className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-base transition"
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700 text-base">
          Image
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          {...register("image")}
          className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-base transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.image && (
          <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
        )}
      </div>
      {imagePreview && (
        <div className="mt-2 flex justify-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="h-32 rounded border shadow"
          />
        </div>
      )}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg text-lg shadow transition disabled:opacity-60"
          disabled={loading}
        >
          {selected ? "Update" : "Add"} Product
        </button>
        {selected && (
          <button
            type="button"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-lg text-lg shadow transition"
            onClick={() => {
              reset();
              setImagePreview(null);
              dispatch(clearSelected());
              if (onSuccess) onSuccess();
            }}
          >
            Cancel
          </button>
        )}
      </div>
      {loading && <p className="text-blue-500 mt-2">Submitting...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
};

export default ProductForm;
