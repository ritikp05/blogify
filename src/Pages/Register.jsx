import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import fetchData from "../assets/constants/fetchData";

const initialval = {
  name: "",
  email: "",
  password: "",
};
const validate = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email address"),
  password: Yup.string().required("Please enter your password").min(5),
});
const Register = () => {
  const navigate = useNavigate();
  const [showpass, Setshowpass] = useState(false);

  function showPasswordHandler() {
    Setshowpass((prev) => {
      return !prev;
    });
  }

  async function handleSubmit(userdata,{resetForm}) {
    try {
      const response = await fetchData(
        "/api/auth/register",
        "POST",
        "Register",
        userdata
      );
      response && navigate("/login");
      toast.success(response.data?.msg);
      resetForm()
    } catch (err) {
      toast.error(err.response.data?.msg);
    }
  }

  return (
    <>
      <Formik
        initialValues={initialval}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        <Form className=" flex flex-col bg-slate-200 shadow-xl w-60 py-10 mx-auto  justify-center items-center mt-32 gap-4">
          <div className="flex flex-col justify-center items-center ">
            <p className="text-2xl mb-6 font-semibold text-blue-600 tracking-widest">
              Signup
            </p>

            <Field
              name="name"
              type="text"
              placeholder="Enter your name"
              className="border-2 border-gray-400 outline-none rounded-r-full"
              autoComplete="off"
    
           />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="name" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="border-2 border-gray-400 outline-none rounded-r-full"
              autoComplete="off"
    
          />

            <div className="text-red-500 text-sm">
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="flex flex-col justify-center  items-center relative">
            <Field
              name="password"
              placeholder="Password"
              type={showpass ? "text" : "password"}
              className="border-2 border-gray-400 outline-none rounded-r-full "
              autoComplete="off"
           />
            {showpass ? (
              <FaRegEye
                className="text-xl absolute right-1"
                onClick={showPasswordHandler}
              />
            ) : (
              <FaRegEyeSlash
                className="text-xl absolute right-1"
                onClick={showPasswordHandler}
              />
            )}
          </div>
          <div className="text-red-500 text-sm -mt-4 ">
            <ErrorMessage name="password" />
          </div>
          <Button type="submit" variant="contained">
            Sign up
          </Button>
          <p className="text-sm">
            Already have an account{" "}
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </p>
        </Form>
      </Formik>
    </>
  );
};

export default Register;
