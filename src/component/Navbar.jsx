import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../context/DataContext";

const Navbar = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  function ProfileHandler() {
    login &&  navigate("/profile");
  }

  return (
    <>
      <nav className="flex shadow-sm shadow-black bg-slate-800 text-white items-center z-50 sticky top-0 h-10 justify-between px-10">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? "underline tracking-wider" : "text-white";
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) => {
            return isActive ? "underline tracking-wider" : "text-white";
          }}
        >
          Create
        </NavLink>

        <FaUserCircle
          className="text-xl cursor-pointer"
          onClick={ProfileHandler}
        />
      </nav>
      <div></div>
    </>
  );
};

export default Navbar;
