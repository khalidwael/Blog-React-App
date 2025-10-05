import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; 


const BACKGROUND_IMAGE_PATH = '/public/v904-nunny-012.jpg'; 

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setError("");
    setIsLoading(true);

    try {
      const res = await login(email, password);
      
      if (!res.success) {
        setError(res.message || "Login failed. Please check your credentials.");
      } else {
        
        window.location.href = "/"; 
      }
    } catch (err) {
      setError("An unexpected error occurred during login.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed p-4"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_PATH})` }}
    >
      <div className="w-full max-w-md">
        
      
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8 drop-shadow-lg">
            Jotter Login
        </h1>

        <form onSubmit={handleSubmit} 
              className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-blue-600 transition duration-300 hover:shadow-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome Back</h2>
          
        
          <label className="form-control w-full mb-4">
            <span className="label-text font-medium text-gray-600 mb-1">Email Address</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full p-3 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              required
            />
          </label>

          <label className="form-control w-full mb-6">
            <span className="label-text font-medium text-gray-600 mb-1">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full p-3 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              required
            />
          </label>

        
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium animate-pulse">
                {error}
            </div>
          )}

          
          <button
            type="submit"
            className={`btn btn-primary w-full p-3 rounded-lg text-white text-lg font-semibold transition duration-300 
                        ${isLoading ? 'loading' : 'hover:bg-blue-700'} `}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
          
         
          <p className="text-center text-gray-600 mt-6 text-sm drop-shadow-md">
            Don't have an account? 
            <Link to="/Register" className="text-blue-600 hover:text-blue-300 font-semibold ml-1 transition">
                Sign Up Here
            </Link>
          </p>
          
        </form>
      </div>
    </div>
  );
}