import "./assets/forum.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Notes from "./pages/Notes";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
