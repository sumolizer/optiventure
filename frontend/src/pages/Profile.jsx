import { auth } from "../firebase";
import {
  updateProfile,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(auth.currentUser?.displayName || "");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 Update Username
  const handleUpdateUsername = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: username });
      alert("Username updated!");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Update Password (Requires Re-authentication)
  const handleUpdatePassword = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        confirmPassword // Old password needed
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, password);
      alert("Password updated!");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Update City (Store in Firestore)
  const handleUpdateCity = async () => {
    try {
      await axios.post("/api/update-city", {
        userId: auth.currentUser.uid,
        city: city,
      });
      alert("City updated!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone!"
      )
    )
      return;

    try {
      const userId = auth.currentUser.uid;
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        confirmPassword
      );

      await reauthenticateWithCredential(auth.currentUser, credential);

      await axios.delete(`/api/delete-user-data/${userId}`);

      await deleteUser(auth.currentUser);

      alert("Your account and all associated data have been deleted.");
      navigate("/");
    } catch (error) {
      alert("Error deleting account: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profilecontainer text-center bg-[#0a2540] font-bold p-3 rounded-lg shadow-md p-5">
        <h1 className="text-2xl mb-4">Your Profile</h1>
        <p className="signlbl">Email: {auth.currentUser?.email}</p>

        {/* 🔹 Edit Username */}
        <div className="mb-4">
          <input
            className="signinp"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Update Username"
          />
          <button className="btneuro ml-2" onClick={handleUpdateUsername}>
            Save Changes
          </button>
        </div>

        {/* 🔹 Change Password */}
        <div className="mb-4">
          <input
            className="signinp ml-3"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter Old Password"
          />
          <input
            className="signinp ml-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <button className="btneuro ml-2" onClick={handleUpdatePassword}>
            Change Password
          </button>
        </div>

        {/* 🔹 Change City */}
        <div className="mb-4">
          <select
            className="signinp p-2 text-black w-30"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="Islamabad">Islamabad</option>
          </select>
          <button className="btneuro ml-12" onClick={handleUpdateCity}>
            Save Changes
          </button>
        </div>

        {/* 🔹 Delete Notes & Forum Comments */}
        <div className="m-4">
          <h3> </h3>
          <button className="btnred" onClick={handleDeleteAccount}>
            Delete My Account
          </button>
        </div>
        {/* 🔹 Logout */}
        <button className="btnred" onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
