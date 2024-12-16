import { useState } from "react";
import { auth } from "../firebase";
import "../assets/Account.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { redirect } from "react-router-dom";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      alert("Signup successful!");
    } catch (error) {
      alert(error.message);
    }
    return <redirect to="/" />;
  };

  return (
    <div className="Signlog">
      <img className="w-20 mx-auto mb-5" src="./public/optiAbstractlogo.png" />
      <p className="signlbl"> Your business journey starts here !</p>
      <br />
      <h1>Create your own account to get started !</h1>
      <form onSubmit={handleSignup}>
        <label className="signlbl" htmlFor="Username">
          {" "}
          Choose a Username
        </label>
        <br />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="signinp"
        />
        <br />
        <label className="signlbl" htmlFor="Username">
          {" "}
          Whats your email address ?
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
          Secure your account
        </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="signinp"
        />
        <br />
        <button className="btnsign text-xl" type="submit">
          Signup
        </button>
      </form>
      <label className="signlbl" htmlFor="password">
        {" "}
        Already have a account ? Log in here
      </label>

      <a href="/login" className="btnsign">
        {" "}
        Login
      </a>
    </div>
  );
}

export default Signup;
