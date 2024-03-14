import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [inpval, setInpval] = useState({
    username: "",
    password: "",
  });
  const [error, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setInpval({ ...inpval, [e.target.name]: e.target.value });
    setErrors({ ...error, [e.target.name]: null });
  };

  // Validate form fields
  const validate = ({ username, password }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = {};
    if (!username) {
      errors.username = "Please enter your Email.";
    } else if (!emailRegex.test(username)) {
      errors.username = "Please enter a valid email.";
    }
    if (!password.trim()) {
      errors.password = "Please enter your password.";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(inpval);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post(
          `${apiUrl}/login`,
          {
            email: inpval.username,
            password: inpval.password,
          }
        );
        localStorage.setItem("@token", res.data.token);
        localStorage.setItem("@isLogin", true);
        navigate("/dashboard");
        setInpval({
          username: "",
          password: "",
        });
      } catch (error) {
        console.log("Login Error", error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        <form
          className="w-full max-w-sm p-5 border bg-slate-100 shadow-2xl  rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={inpval.username}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                error.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {error.username && (
              <p className="text-red-500 text-sm mt-1">{error.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={inpval.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                error.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
