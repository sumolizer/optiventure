import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="Signlog">
      <img className="w-20 mx-auto mb-5" src="./public/optiAbstractlogo.png" />
      <p className="signlbl"> Welcome back </p>
      <br />
      <h1>Log in to continue your Venture !</h1>
      <form onSubmit={handleLogin}>
        <label className="signlbl" htmlFor="Username">
          {" "}
          What was your email address ?
        </label>
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="signinp"
        />
        <br />
        <label className="signlbl" htmlFor="password">
          {" "}
          Enter your vault password{" "}
        </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="signinp"
        />
        <br />
        <button className="btnsign" type="submit">
          Log in !
        </button>
      </form>
      <label className="signlbl" htmlFor="password">
        {" "}
        Dont have an account yet? No worries
      </label>
      <a href="/signup" className="">
        {" "}
        Create Account
      </a>
    </div>
  );
}

export default Login;
