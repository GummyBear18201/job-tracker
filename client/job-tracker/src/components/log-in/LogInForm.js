import React from "react";
import { useEffect, useState } from "react";
import "../../styles.css";

import { useNavigate } from "react-router-dom";
function LogInForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [incorrectPass, setIncorrectPass] = useState(false);
  const navigate = useNavigate();
  function sendRegistration(event) {
    event.preventDefault();

    const userData = {
      email,
      password,
    };

    if (!props.isRegistered && password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    if (!props.isRegistered) {
      fetch("http://localhost:5000/logIn/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User registered successfully");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          props.setUserId(data.userId);

          navigate("/job-table");
        })
        .catch((err) => console.error("POST failed:", err));
    } else {
      fetch("http://localhost:5000/logIn/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User sign in successful");
          console.log(data);
          if (data.error === "Invalid email or password") {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setIncorrectPass(true);
          } else {
            setIncorrectPass(false);
            props.setUserId(data.userId);
            navigate("/job-table");
          }
        })
        .catch((err) => console.error("POST failed:", err));
    }
  }

  return (
    <form className="form" onSubmit={sendRegistration}>
      <div className="flex flex-col items-center justify-center gap-4">
        <input
          className="bg-gray-200 p-2 rounded-md"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-gray-200 p-2 rounded-md"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!props.isRegistered && (
          <input
            className="bg-gray-200 p-2 rounded-md"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <p>{incorrectPass ? "Invalid email or password" : ""}</p>
        <button
          className="border-[5px] border-[rgb(35,7,69)] bg-[rgb(227,227,255)] text-purple-900 px-25 py-2 rounded-md hover:bg-purple-300"
          type="submit"
        >
          {props.isRegistered ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
}

export default LogInForm;
