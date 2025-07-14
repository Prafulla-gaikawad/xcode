import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const { error, success } = useSelector((state) => state.products);

  useEffect(() => {
    if (success) toast.success(success, { autoClose: 2000 });
    if (error) toast.error(error, { autoClose: 2000 });
  }, [success, error]);

  return <ToastContainer position="top-right" theme="colored" />;
};

export default Toast;
