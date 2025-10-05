import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      const loggedUser = res.data.user;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Invalid email or password" };
    }
  };

 
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
