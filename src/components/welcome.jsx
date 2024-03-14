import React, { useState } from "react";
import { SignUp, SignIn } from "./index";

function WelcomePage() {
  const [showSignUp, setShowSignUp] = useState(true);

  return (
    <div className="p-8 mx-auto  bg-blue-200">
      <div className="flex justify-center">
        <button
          className={`py-2 px-4 rounded-lg focus:outline-none ${
            showSignUp ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setShowSignUp(true)}
        >
          Sign Up
        </button>
        <button
          className={` px-4 rounded-lg focus:outline-none ${
            !showSignUp ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setShowSignUp(false)}
        >
          Sign In
        </button>
      </div>
      <div className="mt-5">{showSignUp ? <SignUp /> : <SignIn />}</div>
    </div>
  );
}

export default WelcomePage;
