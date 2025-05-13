import { useState } from "react";
import { auth } from "../firebase";
import "../assets/Account.css";
import "../assets/darkmode.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      navigate("/"); // Redirect to homepage or dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="Signlog m-5">
      <img
        className="w-20 mx-auto mb-5"
        src="/optiAbstractlogo.png"
        alt="Opti logo"
      />
      <p className="signlbl text-center">Your business journey starts here!</p>
      <h1 className="text-center nv-inactive mb-5">
        Create your own account to get started!
      </h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="signlbl" htmlFor="username">
            Choose a Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="signinp w-full p-2 border rounded-md"
            required
            minLength={5}
            maxLength={12}
          />
        </div>

        <div>
          <label className="signlbl" htmlFor="email">
            What's your email address?
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="signinp w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="signlbl" htmlFor="password">
            Secure your account
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="signinp w-full p-2 border rounded-md"
            required
            minLength={8}
            maxLength={12}
          />
        </div>

        <div className="text-center">
          <button className="nv-active text-xl py-2 px-4 rounded-md bg-yellow-500 hover:bg-yellow-400 transition">
            Signup
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <p className="optifont">
          Already have an account?{" "}
          <a href="/login" className="nv-inactive text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
