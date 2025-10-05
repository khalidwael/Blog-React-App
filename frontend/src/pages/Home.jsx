import React from 'react'

export default function Home() {
  return (
    <div className="grid grid-cols-2 h-screen">
      
     
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-[80px] font-bold mb-4 text-blue-600"><span className='text-gray-700'>Notes</span> at Your Fingertips</h1>
        <p className="text-lg text-center max-w-md text-gray-400">
          JoTTer is a simple and fast note-taking app that helps you jot down your ideas, 
          organize your tasks, and keep all your notes in one place.
        </p>
      </div>

      
      <div className="flex items-center justify-center ">
        <img 
          src="/home_img.jpg" 
          alt="home illustration" 
          className="max-w-full h-auto rounded-lg "
        />
      </div>

    </div>
  )
}
