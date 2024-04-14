import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fetchData from "../assets/constants/fetchData";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const Navigate = useNavigate();

  const initialval = {
    password: "",
    confirmPassword: "",
  };

  const schema = Yup.object().shape({
    password: Yup.string().required("Please enter your password").min(6),
    confirmPassword: Yup.string()
      .required("Please enter your password")
      .min(6)
      .oneOf([Yup.ref("password"), null], "Confirm password is not matching"),
  });

  function passwordHandler() {
    setShowPassword((prev) => {
      return { ...prev, password: !prev.password };
    });
  }

  function confirmPasswordHandler() {
    setShowPassword((prev) => {
      return { ...prev, confirmPassword: !prev.confirmPassword };
    });
  }

  async function handleSubmit(data,{resetForm}) {
    try {
      const response = await fetchData(
        `/api/auth/updatepassword`,
        "PUT",
        "ChangePassword",
        data
      );
      resetForm();
      toast.success(response.data.msg);
      Navigate("/");
    } catch (err) {
      console.log(err.response.data.msg);
    }
  }
  return (
    <Formik
      initialValues={initialval}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className="flex  justify-center items-center mt-20 ">
        <div className="bg-white rounded-lg shadow-sm shadow-black flex flex-col gap-3 p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Change Password
          </h2>

          <div className="mb-4 flex justify-center items-center">
            <Field
              type={showPassword.password ? "text" : "password"}
              name="password"
              className="border-b-2 border-blue-700 w-10/12  outline-none"
              placeholder="Enter new password"
            />

            {showPassword.password ? (
              <FaRegEye className="text-xl" onClick={passwordHandler} />
            ) : (
              <FaRegEyeSlash className="text-xl" onClick={passwordHandler} />
            )}
          </div>

          <div className="text-center  -mt-4 text-red-500">
            <ErrorMessage name="password" />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <Field
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="border-b-2 border-blue-700 w-10/12 outline-none"
              placeholder="Confirm new password"
            />

            {showPassword.confirmPassword ? (
              <FaRegEye className="text-xl" onClick={confirmPasswordHandler} />
            ) : (
              <FaRegEyeSlash
                className="text-xl"
                onClick={confirmPasswordHandler}
              />
            )}
          </div>
          <div className="text-center -mt-4 text-red-500">
            <ErrorMessage name="confirmPassword" />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-1  mt-4 mb-2 hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ChangePassword;
