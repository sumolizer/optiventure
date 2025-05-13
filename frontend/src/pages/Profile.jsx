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
  const [mode, setMode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 Unified Save Handler
  const handleSaveAll = async () => {
    try {
      const user = auth.currentUser;
      const updates = [];

      // 🔹 Username update if changed
      if (username && username !== user.displayName) {
        updates.push(updateProfile(user, { displayName: username }));
      }

      // 🔹 Password update if both provided and not empty
      if (password && confirmPassword) {
        const credential = EmailAuthProvider.credential(
          user.email,
          confirmPassword
        );
        await reauthenticateWithCredential(user, credential);
        updates.push(updatePassword(user, password));
      }

      // 🔹 Mode update if selected
      if (mode) {
        updates.push(
          axios.post("/api/updatemode", {
            userId: user.uid,
            uimode: mode,
          })
        );
      }

      if (updates.length === 0) {
        alert("No changes detected.");
        return;
      }

      await Promise.all(updates);
      alert("Only modified fields have been saved successfully!");
    } catch (error) {
      alert("Error: " + error.message);
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
      <div className="profilecontainer text-center bg-[#0a2540] font-bold p-3 rounded-lg shadow-md">
        <h1 className="text-2xl mb-6">Your Profile</h1>
        <p className="signlbl mb-4">Email: {auth.currentUser?.email}</p>

        <div className="grid gap-6 text-left max-w-xl mx-auto">
          {/* Username */}
          <div className="flex justify-between items-center">
            <label className="w-1/2 optifont">Username</label>
            <input
              className="signinp w-1/2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Update Username"
            />
          </div>

          {/* Old Password */}
          <div className="flex justify-between items-center">
            <label className="w-1/2 optifont">Old Password</label>
            <input
              className="signinp w-1/2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Old Password"
            />
          </div>

          {/* New Password */}
          <div className="flex justify-between items-center">
            <label className="w-1/2 optifont">New Password</label>
            <input
              className="signinp w-1/2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
          </div>

          {/* Mode Selector */}
          <div className="flex justify-between items-center">
            <label className="w-1/2 optifont">UI Mode</label>
            <select
              className="signinp w-1/2 text-black"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="dark">Dark Mode</option>
              <option value="bright">Bright Punchy Vivid Mode</option>
            </select>
          </div>

          {/* 🔘 Unified Save Button */}
          <div className="text-center">
            <button className="btneuro mt-4" onClick={handleSaveAll}>
              Save All Changes
            </button>
          </div>

          {/* Delete + Logout */}
          <div className="text-center mt-6 space-x-4">
            <button className="btnred" onClick={handleDeleteAccount}>
              Delete My Account
            </button>
            <button className="btnred" onClick={() => signOut(auth)}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
