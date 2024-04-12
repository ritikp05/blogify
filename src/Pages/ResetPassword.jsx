import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate=useNavigate()
  const validationSchema = Yup.object().shape({
    otp: Yup.number("otp must be a number").required("Please enter otp"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter email address"),
    password: Yup.string().required("Please enter password"),
  });

  async function handleSubmit(data) {
    try {
      const response = await axios.post(
        "http://localhost:4400/api/auth/resetpassword",
        data
      );
toast.success(response.data.msg)
console.log(response);

    } catch (err) {
      console.error(err.response.data.msg); // Log the error
 toast.error(err.response.data.msg); // Log the
      // Handle error appropriately, e.g., show error message to the user
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Formik
        initialValues={{
          otp: "",
          email: "",
          password: "",
        }}
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
            />
            <div className="text-center">
              <ErrorMessage
                name="otp"
                component="p"
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
            />
            <div className="text-center">
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <div className="text-center">
              <ErrorMessage
                name="password"
                component="p"
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
            <button onClick={()=>navigate(-1)}    className="bg-purple-500 mx-auto hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-2xl focus:outline-none focus:shadow-outline"
           >Back</button>
  
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;
