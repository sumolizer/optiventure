import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to home after login
    } catch (err) {
      alert("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="Signlog">
        <img className="w-20 mx-auto mb-5" src="/optiAbstractlogo.png" />
        <p className="signlbl"> Welcome back </p>
        <br />
        <h1 className="nv-inactive">Log in to continue your Venture !</h1>
        <br />
        <form onSubmit={handleLogin}>
          <label className="signlbl" htmlFor="email">
            {" "}
            What was your email address ?
          </label>
          <br />
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="signinp"
            required
          />
          <br />
          <label className="signlbl" htmlFor="password">
            {" "}
            Enter your vault password{" "}
          </label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="signinp"
            minLength={8}
            maxLength={12}
            required
          />
          <br />
          <br />
          <button className="nv-active" type="submit">
            Log in !
          </button>
        </form>
        <br />
        <label className="signlbl"> Dont have an account yet?</label>
        <a href="/signup" className="nv-inactive">
          {" "}
          Signup
        </a>
      </div>
    </div>
  );
}

export default Login;
