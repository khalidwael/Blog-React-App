import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const { user } = useAuth();

  
  const resetModalState = () => {
    setModalOpen(false);
    setTitle("");
    setDescription("");
    setImage(null);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts");
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const trendingPosts = posts.slice(0, 3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; 

    if (!title || !description) return alert("Please fill all fields");
    if (!user) return alert("You must be logged in to post.");

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("authorName", user.name);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Error Response:", res.status, errorText);
        alert(`Failed to add post: Server error (${res.status}). Check the console for details.`);
        return;
      }

      const data = await res.json();
      
      if (data.success) {
        setPosts([data.post, ...posts]);
        resetModalState(); 
        alert("Post added successfully!");
      } else {
        alert(`Failed to add post: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Request failed or JSON parsing error:", err);
      alert("An unexpected error occurred during post submission.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 min-h-screen bg-gray-50 ">
      
      <div className="col-span-1 bg-white rounded-lg shadow p-4 sticky top-4 h-fit border-t-4 border-blue-500">
        <ul className="menu rounded-box w-56">
          <li>
            <h2 className="menu-title text-blue-600 font-semibold">Topics</h2>
            <ul className="text-gray-600 font-medium">
              <li><a>Technology</a></li>
              <li><a>Cars</a></li>
              <li><a>Work</a></li>
              <li><a>Fashion</a></li>
              <li><a>Sports</a></li>
              <li><a>Football</a></li>
              <li><a>Programming</a></li>
              <li><a>Electronics</a></li>
              <li><a>Animals</a></li>
              <li><a>Health</a></li>
              <li><a>Art</a></li>
              <li><a>Science</a></li>
              <li><a>Math</a></li>
              <li><a>Traveling</a></li>
            </ul>
          </li>
        </ul>
      </div>

     
      <main className="col-span-1 md:col-span-2 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-600">  Recent Blog Posts</h1>
        <div className="flex flex-col items-center gap-6 w-full">
          {isLoading ? (
            <p className="text-center text-blue-500 w-full p-10">Loading posts...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-gray-500 w-full p-10">No posts available.</p>
          )}
        </div>
      </main>

    
      <div className="col-span-1 hidden md:flex flex-col gap-4 bg-white rounded-xl shadow-lg p-6 sticky top-4 h-fit border-t-4 border-red-500"> {/* 🛠️ تم تغيير الحدود هنا إلى الأزرق */}
        <h2 className="text-center text-red-700 font-bold border-b pb-2 text-lg">Trending Posts</h2>
        <ul className="list bg-base-100 rounded-box shadow-md">
          {trendingPosts.map((post) => (
            <li key={post.id} className="list-row">
              <div><img className="size-10 rounded-box" src={post.image} alt={post.title} /></div>
              <div>
                <div>{post.authorName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{post.title}</div>
              </div>
            </li>
          ))}
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most popular posts this week</li>
        </ul>
      </div>

      
      {user && (
        <button
          className="btn btn-primary btn-md fixed bottom-8 right-8 rounded-full shadow-xl px-4 font-semibold tracking-wide"
          onClick={() => setModalOpen(true)}
        >
          + Add Post
        </button>
      )}

      
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-2xl transform transition-all">
            
            
            <button
              className="absolute top-2 right-2 btn btn-ghost btn-sm btn-circle text-gray-500 hover:bg-gray-100"
              onClick={resetModalState}
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold text-primary mb-6">Create New Post</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Post Title</span></div>
                <input
                  type="text"
                  placeholder="The amazing title of your post"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label"><span className="label-text">Description</span></div>
                <textarea
                  placeholder="Write the full description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-bordered w-full h-32"
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