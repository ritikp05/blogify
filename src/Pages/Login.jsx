import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useState } from "react";

const initialvalue = {
  email: "",
  password: "",
};

const validate = Yup.object({
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email address"),
  password: Yup.string().required("Please enter your password"),
});
const Login = ({ setLogin }) => {
  const [showpass, Setshowpass] = useState(false);

  function showPasswordHandler() {
    Setshowpass((prev) => {
      return !prev;
    });
  }
  async function handleSubmi(filleddata) {
    try {
      const { data } = await axios.post(
        "http://localhost:4400/api/auth/login",
        filleddata
      );
      console.log(data);
      localStorage.setItem("UserCredentials", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      toast.success("Login sucessfull");
      setLogin(true);
    } catch (err) {
      toast.error(err.response.data.msg);
      setLogin(false);
    }
  }

  return (
    <>
      <Formik
        initialValues={initialvalue}
        onSubmit={handleSubmi}
        validationSchema={validate}
      >
        <Form className=" flex flex-col bg-slate-200 shadow-xl w-60 py-10 mx-auto  justify-center items-center mt-32 gap-4">
          <div className="flex flex-col justify-center items-center ">
            <p className="text-2xl mb-6 font-semibold text-blue-600 tracking-widest">
              Login
            </p>
            <Field
              name="email"
              placeholder="Enter your email"
              className="border-2 rounded-r-full border-gray-400 outline-none"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="flex justify-center relative items-center">
            <Field
             type={showpass ? "text" : "password"}
             name="password"
              placeholder="Enter your password"
              className="border-2 border-gray-400 outline-none rounded-r-full"
            />
            {showpass ? (
              <FaRegEye className="text-xl absolute right-1" onClick={showPasswordHandler} />
            ) : (
              <FaRegEyeSlash
                className="text-xl absolute right-1"
                onClick={showPasswordHandler}
              />
            )}
          </div>
            <div className="text-red-500 text-sm -mt-4">
              <ErrorMessage name="password" />
            </div>
          <Button type="submit" variant="contained">
            Login
          </Button>
          <p className="text-sm">
            Don't have an account{" "}
            <Link to="/register" className="text-blue-700 ">
              Register
            </Link>
          </p>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
