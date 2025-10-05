import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [userPosts, setUserPosts] = useState([]); 
  
  const [notification, setNotification] = useState(null); 

  
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

 
  const resetModalState = () => {
    setShowModal(false);
    setTitle("");
    setDescription("");
    setImage(null);
  };

 
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts");
        const filteredPosts = res.data.filter(post => post.authorName === user.name);
        setUserPosts(filteredPosts);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!title || !description) {
      showNotification("Please fill all required fields.", 'error');
      return; 
    }
    
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("authorName", user.name);
      if (image) formData.append("image", image);

      const response = await axios.post("http://localhost:5000/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUserPosts([response.data.post, ...userPosts]); 
      resetModalState(); 
      
      showNotification("Post added successfully!", 'success');

    } catch (err) {
      console.error("Failed to add post:", err);
      showNotification("Failed to add post. Please try again.", 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
      return <div className="min-h-screen flex justify-center items-center">
          <p className="text-xl text-red-500">Please log in to view your profile.</p>
      </div>;
  }

  
  const getAlertClass = (type) => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      default:
        return 'alert-info';
    }
  };

  return (
    <div className="min-h-screen relative p-4 md:p-12 bg-gray-100">

      
      {notification && (
        <div className={`fixed top-4 right-4 w-full max-w-sm z-50 transition-all duration-300`}>
          <div className={`alert ${getAlertClass(notification.type)} shadow-lg`}>
          
            {notification.type === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            {notification.type === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            <span>{notification.message}</span>
            <button className="btn btn-xs btn-ghost" onClick={() => setNotification(null)}>✕</button>
          </div>
        </div>
      )}

      
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto mb-8 flex flex-col md:flex-row items-center gap-6">
        
        
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img 
                src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`} 
                alt={`${user.name}'s avatar`}
            />
          </div>
        </div>

        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl font-extrabold text-gray-800">{user.name}</h1>
          <p className="text-lg text-gray-500 mb-4">{user.email}</p>
          
          <div className="flex flex-row gap-3">
              <button
                className="btn btn-primary btn-block rounded-box flex-1"
                onClick={() => setShowModal(true)}
              >
                + Add Post
              </button>
              <button
                className="btn btn-error btn-outline btn-sm"
                onClick={logout}
              >
                Logout
              </button>
          </div>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">Your Posts ({userPosts.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userPosts.length > 0 ? (
                userPosts.map((post) => (
                    <div key={post.id} className="card bg-white shadow-md">
                        <figure className="h-48">
                            <img src={post.image || "https://via.placeholder.com/400x200?text=No+Image"} alt={post.title} className="object-cover w-full h-full" />
                        </figure>
                        <div className="card-body p-4">
                            <h3 className="card-title text-xl">{post.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
                            <p className="text-xs text-gray-400 mt-2">Posted on: {post.date}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 col-span-full text-center p-10">You haven't posted anything yet. Be the first!</p>
            )}
        </div>
      </div>

    
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-2xl transform transition-all">
            
          
            <button
              className="absolute top-2 right-2 btn btn-ghost btn-sm btn-circle text-gray-500 hover:bg-gray-100"
              onClick={resetModalState}
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold text-primary mb-6">Create New Post</h2>
            
            <form className="flex flex-col gap-4" onSubmit={handleAddPost}>
              
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Post Title</span></div>
                <input
                  type="text"
                  placeholder="The amazing title of your post"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label"><span className="label-text">Description</span></div>
                <textarea
                  placeholder="Write the full description here..."
                  className="textarea textarea-bordered w-full h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Attach Image</span></div>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  className="file-input file-bordered w-full"
                />
              </label>

              <button 
                type="submit" 
                className={`btn btn-primary mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    'Publish Post'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}