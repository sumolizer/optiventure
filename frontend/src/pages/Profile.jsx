import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

function Profile() {
  // const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
    console.log("Yo");
  };

  return (
    <>
      <Navbar />
      <div className="profilecontainer text-center bg-[#0a2540] text-white font-bold p-3 rounded-lg shadow-md">
        <h1>Your Profile</h1>
        <p className="signlbl">
          Username: {auth.currentUser?.displayName || "No username"}
        </p>
        <p className="signlbl">Email: {auth.currentUser?.email}</p>
        <button className="btneuro" onClick={handleLogout}>
          Edit Profile
        </button>
        <button className="btneuro" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
