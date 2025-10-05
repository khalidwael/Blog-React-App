import React from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();


  const userAvatar = user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`;

  return (
    <nav className="bg-white text-gray-700 px-6 py-4 flex justify-between items-center shadow-md">
      
    
      <div className="flex text-2xl font-bold gap-3 items-center">
        <img src='/public/jotter logo.png' alt='logo' className='w-8 h-8 rounded-full'/>
        <Link to="/" className="text-blue-600 hover:text-blue-700">Jotter</Link>
      </div>

      
      <label className="hidden md:flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 bg-gray-50 max-w-md w-full focus-within:ring-2 focus-within:ring-blue-500 transition duration-200">
        <svg
          className="h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          type="search"
          required
          placeholder="Search for posts..."
          className="outline-none flex-1 bg-transparent px-2"
        />
      </label>

  
      <div className="hidden sm:flex gap-6 font-medium text-gray-600">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/posts" className="hover:text-blue-600 transition">Posts</Link>
        
        {user && (
          <Link to="/profile" className="hover:text-blue-600 transition">My Profile</Link>
        )}
      </div>

      
      <div className='flex items-center gap-3'>
        {user ? (
          
          <div className="dropdown dropdown-end">
            
           
            <div tabIndex={0} role="button" className="btn btn-ghost flex items-center gap-2 rounded-full px-3 py-1 transition duration-200 hover:bg-gray-100">
              
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img 
                    src={userAvatar} 
                    alt={user.name} 
                  />
                </div>
              </div>
            
              <span className="font-semibold text-gray-800 hidden sm:inline">{user.name.split(' ')[0]}</span>
            </div>
            
            
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 shadow-xl z-50 mt-3 p-2 border border-gray-100">
              
            
              <li>
                <Link to="/profile" className="justify-between">
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-blue-500"/>
                  Profile Settings
                </Link>
              </li>
              
              
              <li>
                <a onClick={logout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4"/>
                  Logout
                </a>
              </li>
            </ul>
          </div>

        ) : (
          
          <>
            <Link to="/Login">
              <button 
                className="btn btn-sm btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200">
                <FontAwesomeIcon icon={faUser} />
                Login
              </button>
            </Link>

            <Link to="/Register">
              <button 
                className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 border-blue-600 transition duration-200">
                <FontAwesomeIcon icon={faUserPlus} />
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}