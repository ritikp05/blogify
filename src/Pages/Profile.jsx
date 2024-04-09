import React from "react";
import { UserCredentials } from "../assets/islogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

const Profile = ({ setLogin }) => {
  const [userCredentials] = useState(UserCredentials());
  const navigate = useNavigate();
  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("login")
    localStorage.removeItem("UserCredentials");
    window.location.reload();
  }

  function changePasswordHandler() {
    navigate("/changepassword");
  }

  return (
    <>
      <div className="flex flex-col items-center mt-10  justify-start min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4 my-4">
          <div className="flex items-center justify-center mb-2">
            <FaUserCircle className="rounded-full w-28 h-28 border-4 text-blue-300 border-indigo-500" />
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            {userCredentials?.name}
          </h1>
          <p className="text-lg text-center text-gray-600 mb-6">
            {userCredentials?.email}
          </p>
          <button
            onClick={changePasswordHandler}
            className="bg-indigo-500 text-base text-white  py-2 rounded-md mb-4 w-full hover:bg-indigo-600 focus:outline-none"
          >
            Change Password
          </button>
          <button
            onClick={logoutUser}
            className="bg-red-500 text-white py-2 text-base rounded-md w-full hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
