import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
// m 'formik';
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ConfirmEmail = () => {
  // const [showPassword, setShowPassword] = useState(false);

  // function passwordHandler() {
  //   setShowPassword((prev) => !prev);
  // }
   const shape = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your email")
      .email("Invalid email address"),
  });
  async function handleSubmit(data) {
    try {
      const datas = await axios.post(
        "http://localhost:4400/api/auth/sendmail",
        data
      );
      toast.success("Otp sent to your email ✔️");
     
    } catch (err) {
    toast.error(err.response.data.msg);
    }
  }

  return (
   <>
      <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={shape}
    >
      <Form
        className={"max-w-md mx-auto  mt-32 p-6  rounded-lg shadow-md"}
      >
         <h2 className="text-2xl font-semibold text-center mb-4">
          Confirm Email
        </h2>
  
        <div className="mb-4">
          <Field
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your Email"
          />
          <div className="text-center mx-auto mt-1 text-red-600">
            <ErrorMessage name="email" />
          </div>
        </div>
        {/* <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter your Password"
        />
        <button
          className="absolute right-0 bottom-0 mb-2 mr-2 text-gray-600"
          onClick={passwordHandler}
        >
          {showPassword ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
        </button>
      </div> */}
      
         <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >    Submit
      </button>
   
        </Form>
    </Formik>
    </>
   
  );
};

export default ConfirmEmail;
