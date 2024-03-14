import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="flex h-[5vw] px-10 overflow-hidden justify-end bg-cyan-300">
      <div className="flex items-center">
        <button
          onClick={handleLogout}
          className="bg-red-500  shadow-2xl items-center flex hover:bg-green-600 text-[1vw] py-2  px-5 font-bold rounded-xl"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
