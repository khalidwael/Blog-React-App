import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="max-w-sm w-96 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

     
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-blue-600">{post.title}</h2>

        <p className="text-gray-700 text-sm line-clamp-3">{post.description}</p>

        <span className="text-xs text-gray-400">By {post.authorName}</span>
      </div>
    </div>
  );
}
