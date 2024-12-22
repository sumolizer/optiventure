import "./assets/forum.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Notes from "./pages/Notes";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import LoadingSpinner from "./components/loading";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page-container">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Signup />
                </Suspense>
              }
            />
            <Route
              path="/forum"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Forum />
                </Suspense>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Reports />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Notes />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Profile />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
