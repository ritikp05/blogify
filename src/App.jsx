import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreateBlog from "./Pages/CreateBlog";
import UpdateBlog from "./Pages/UpdateBlog";
import SingleBlog from "./Pages/SingleBlog";
import { useContext } from "react";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./component/ProtectedRoute";
import Page404 from "./Pages/Page404";
import Navbar from "./component/Navbar";
import { AppContext } from "./context/DataContext";
import ChangePassword from "./Pages/ChangePassword";
import ConfirmEmail from "./Pages/ConfirmEmail";
import ResetPassword from "./Pages/ResetPassword";

const App = () => {
  const { login, setLogin } = useContext(AppContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute login={login}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={login ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={login ? <Navigate to="/" /> : <Login setLogin={setLogin} />}
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute login={login}>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute login={login}>
              <SingleBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute login={login}>
              <UpdateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute login={login}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/changepassword"
          element={
            <ProtectedRoute login={login}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmemail"
          element={login ? <Navigate to="/" /> : <ConfirmEmail />}
        />
        <Route
          path="/resetpassword"
          element={login ? <Navigate to="/" /> : <ResetPassword />}
        />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
