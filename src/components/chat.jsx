// Chat.jsx
import React from 'react';
import { IoSendOutline } from "react-icons/io5";


function Chat() {
  return (
    <div className='ml-[16em] p-4 mt-8'>
      <div className='bg-green-500 fixed top-22 left-[16em] w-[calc(100%-13em)] z-10'>
        <p className='text-3xl text-black'>This is Header</p>
      </div>
      <div className='mt-20'> {/* Adjusted margin to account for fixed header height */}
        {/* Chat messages and other content can go here */}
        <p className="text-lg">Chat content goes here...</p>
        {/* Add more content to ensure scrolling happens */}
        <div className="h-[200vh]"> {/* Example height for scrolling */}
          <p>More chat content...</p>
        </div>

        {/* Chat Input */}
        <div className='fixed bottom-4 left-[16em] w-[calc(100%-16em)] z-10 flex items-center p-4 space-x-1'>
  <input 
    type="text" 
    placeholder='Type message here' 
    className='p-2 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 p-4'
  />
  <button className='bg-green-600 text-white p-4  rounded-2xl hover:bg-green-700 transition'>
    <IoSendOutline className='text-3xl'/>
  </button>
</div>


      </div>
    </div>
  );
}

export default Chat;
