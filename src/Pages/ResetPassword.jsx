import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import fetchData from "../assets/constants/fetchData";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()
const initialValues={
  otp: "",
  email: "",
  password: "",
}
  function passwordHandler() {
    setShowPassword((prev) => !prev);
  }

  const validationSchema = Yup.object().shape({
    otp: Yup.number("otp must be a number").required("Please enter otp"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter email address"),
    password: Yup.string().required("Please enter password"),
  });

  async function handleSubmit(data,{resetForm}) {
    try {
      const response = await fetchData(
        "/api/auth/resetpassword",
        "PUT",
        "ResetPassword",
        data
      );
      toast.success(response.data.msg);
     navigate("/login"); 
    
    resetForm();
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white shadow-md mt-20 rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="otp"
            >
              OTP
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="otp"
              type="number"
              placeholder="Enter OTP"
              autoComplete="off"
    
          />
            <div className="text-center">
              <ErrorMessage
                name="otp"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Enter email address"
              autoComplete="off"
    
    />
            <div className="text-center">
              <ErrorMessage
                name="email"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>
          <div className=" mb-6">
            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                autoComplete="off"
    
    />

              <button
                className="absolute right-0 bottom-0 mb-2 mr-2 text-gray-600"
                onClick={passwordHandler}
                type="button"
              >
                {showPassword ? (
                  <FaRegEye className="text-xl" />
                ) : (
                  <FaRegEyeSlash className="text-xl" />
                )}
              </button>
            </div>

            <div className="text-center">
              <ErrorMessage
                name="password"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center justify-between">
            <button
              className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-purple-500 mx-auto hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-2xl focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;
