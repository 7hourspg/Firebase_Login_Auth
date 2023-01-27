import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {DataContext} from "./Context/Context";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

function App() {
  const {getEmail} = React.useContext(DataContext);
  const ProctedRoute = ({children}) => {
    if (!getEmail) {
      return <Navigate to="login" />;
    }
    return children;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProctedRoute>
              <Home />
            </ProctedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
