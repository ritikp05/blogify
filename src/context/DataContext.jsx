import React, { createContext, useState, useEffect } from "react";
import Islogin from "../assets/islogin";
export const AppContext = createContext();

const DataContext = ({ children }) => {
  const [login, setLogin] = useState(Islogin());
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(login));
  }, [login]);

  return (
    <>
      <AppContext.Provider value={{ login, setLogin, showModel, setShowModel }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export default DataContext;
