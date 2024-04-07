import { TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const ChangePassword = () => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
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

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleChangepassword() {
    try {
      const res = await axios.put(
        `http://localhost:4400/api/auth/updatepassword`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex  justify-center items-center mt-20 ">
      <div className="bg-white rounded-lg shadow-sm shadow-black flex flex-col gap-3 p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Change Password
        </h2>
        <div className="mb-4 flex justify-center items-center">
          <TextField
            name="password"
            onChange={handleChange}
            variant="standard"
            label="New Password"
            type={showPassword.password ? "text" : "password"}
            fullWidth
            value={data.password}
          />
          {showPassword.password ? (
            <FaRegEye className="text-xl" onClick={passwordHandler} />
          ) : (
            <FaRegEyeSlash className="text-xl" onClick={passwordHandler} />
          )}
        </div>
        <div className="mb-6 flex justify-center items-center">
          <TextField
            name="confirmPassword"
            onChange={handleChange}
            variant="standard"
            label="Confirm New Password"
            type={showPassword.confirmPassword ? "text" : "password"}
            fullWidth
            value={data.confirmPassword}
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
        <button
          onClick={handleChangepassword}
          className="bg-green-500 text-white px-4 py-1 hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};


export default ChangePassword;
