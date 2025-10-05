import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";


function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; 
  if (!user) return <Navigate to="/login" replace />; 

  return children;
}

function App() {
  return (
    <AuthProvider>
      
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1 p-6">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-post"
                element={
                  <ProtectedRoute>
                    <AddPost />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      
    </AuthProvider>
  );
}

export default App;
