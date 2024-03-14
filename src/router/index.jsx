import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { TaskManagement, TopHeader, WelcomePage } from "../components";
import PrivateRoute from "./privateRoute";

export default function Router() {
  const isLoggedIn = !!localStorage.getItem("@token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <WelcomePage />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <TaskManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />}
        />
      </Routes>
    </>
  );
}
