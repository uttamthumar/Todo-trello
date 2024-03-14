import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [inpval, setInpval] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setErrors] = useState({});
  const navigate = useNavigate()

  // Handle input change
  const handleChange = (e) => {
    setInpval({ ...inpval, [e.target.name]: e.target.value });
    setErrors({ ...error, [e.target.name]: null });
  };

  // Validate form fields
  const validate = ({
    firstName,
    password,
    lastName,
    email,
    confirmPassword,
  }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = {};
    if (!email) {
      errors.email = "Please enter your email.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email.";
    }
    if (!firstName) {
      errors.firstName = "Please enter your first name.";
    }
    if (!lastName) {
      errors.lastName = "Please enter your last name.";
    }
    if (!password.trim()) {
      errors.password = "Please enter your password.";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please enter your confirm password.";
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
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
        const res = await axios.post(`${apiUrl}/signup`, {
          username: inpval.firstName,
          email: inpval.email,
          phone: "1234567890",
          password: inpval.password,
          confirmPassword: inpval.confirmPassword,
        });
        alert("Successfully created account!");
        localStorage.setItem("@token", res.data.token);
        localStorage.setItem("@isLogin", true);
        navigate("/dashboard");
        setInpval({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        alert(error?.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <form
          className="w-full max-w-sm p-5 border bg-slate-100 shadow-2xl rounded-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={inpval.firstName}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                error.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {error.firstName && (
              <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={inpval.lastName}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                error.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {error.lastName && (
              <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={inpval.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                error.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          <div>
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

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={inpval.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                error.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
            />
            {error.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {error.confirmPassword}
              </p>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none my-2"
            type="submit"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
