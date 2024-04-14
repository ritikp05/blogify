import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import fetchData from "../assets/constants/fetchData";
import Loader from "../component/Loader";

const ConfirmEmail = () => {
  const [loading,setLoading] =useState(false)
  const [error,setError]=useState("")
  const navigate = useNavigate();
  const shape = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your email")
      .email("Invalid email address"),
  });
  async function handleSubmit(data,{resetForm}) {
    try {
      setLoading(true);
      const response = await fetchData(
        "/api/auth/sendmail",
        "POST",
        "ConfirmEmail",
        data
      );
      console.log(response);
      setLoading(false)
      resetForm();
      toast.success("Otp sent to your email ✔️");
      navigate("/resetpassword");
    } catch (err) {
      setLoading(false)
      setError(err)
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
        <Form className={"max-w-md mx-auto  mt-32 p-6  rounded-lg shadow-md"}>
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
         {
          !loading?
         <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        :<div className="-mt-28">
          <Loader error={error}/>
          </div>
          } 
        </Form>
      </Formik>
        
    </>
  );
};

export default ConfirmEmail;
