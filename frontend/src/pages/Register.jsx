import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom"; 


const BACKGROUND_IMAGE_PATH = '/public/v904-nunny-012.jpg'; 


const schema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Full Name is required"),
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Register() {
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setRegisterError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/register", data);
      
      reset();
      window.location.href = "/login"; 
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Email already exists or connection failed.";
      setRegisterError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed p-4"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_PATH})` }}
    >
      <div className="w-full max-w-md">
        
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8 drop-shadow-lg">
            Jotter Sign Up
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} 
              className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-green-600 transition duration-300 hover:shadow-3xl space-y-5">
          
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Create Your Account
          </h2>

         
          <label className="form-control w-full">
            <span className="label-text font-medium text-gray-600 mb-1">Full Name</span>
            <input
              type="text"
              {...register("name")}
              className={`input input-bordered w-full p-3 transition duration-200 
                         ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
              placeholder="Khalid Wael"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 font-medium">{errors.name.message}</p>}
          </label>

         
          <label className="form-control w-full">
            <span className="label-text font-medium text-gray-600 mb-1">Email Address</span>
            <input
              type="email"
              {...register("email")}
              className={`input input-bordered w-full p-3 transition duration-200 
                         ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email.message}</p>}
          </label>

          
          <label className="form-control w-full">
            <span className="label-text font-medium text-gray-600 mb-1">Password</span>
            <input
              type="password"
              {...register("password")}
              className={`input input-bordered w-full p-3 transition duration-200 
                         ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 font-medium">{errors.password.message}</p>}
          </label>
          
          
          {registerError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm font-medium animate-pulse">
                {registerError}
            </div>
          )}

         
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full p-3 rounded-lg text-white text-lg font-semibold transition duration-300 
                        bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700
                        ${loading ? 'loading' : ''} `}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

       
        <p className="text-center text-white mt-6 text-sm drop-shadow-md">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-300 transition">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}