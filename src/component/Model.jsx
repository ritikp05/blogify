import {UserCredentials} from "../assets/islogin";
import {useState} from "react";
const Model = ({ setLogin, setShowModel, login }) => {
  const [userCredentials, setUserCredentials] = useState(UserCredentials());

  function logoutUser() {
    setLogin(false);
    setShowModel(false);
    localStorage.removeItem("token");
    localStorage.removeItem("UserCredentials");
    setLogin(false);
  }

  return (
    <>
     
        <div className={!login? "hidden": "flex flex-col fixed top-9 right-0 sm:px-4 px-1 h-40 gap-2 justify-center items-center w-fit bg-slate-300  "}>
          <h1 className="font-semibold">{userCredentials?.name}</h1>
          <p>{userCredentials?.email}</p>
          <button onClick={logoutUser} className="text-white tracking-wide">
            Logout
          </button>
        </div>
      {/* )} */}
    </>
  );
};

export default Model;
