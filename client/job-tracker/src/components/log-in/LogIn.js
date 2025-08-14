import React, { useState } from "react";
import LogInForm from "./LogInForm";
import "../../styles.css";
import Header from "../header/Header";
function LogIn({ setUserId }) {
  const [userIsRegistered, setUserIsRegistered] = useState(true);

  return (
    <div className="bg-gradient-to-t from-purple-300 to-transparent h-screen">
      <Header loggedIn={false} />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold mb-4">
          {userIsRegistered ? "User Login" : "Create account"}
        </h2>
        <LogInForm isRegistered={userIsRegistered} setUserId={setUserId} />
        <button
          className=" text-purple-900 "
          onClick={() => setUserIsRegistered(!userIsRegistered)}
        >
          {userIsRegistered ? "Create account" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
export default LogIn;
