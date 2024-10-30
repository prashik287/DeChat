// App.js
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Chat from './components/chat'; // Corrected import
import { useState } from 'react';

function App() {
  const [selectedUser , setSelectedUser ] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  const handleUserSelect = (user) => {
    setSelectedUser (user);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='bg-white w-screen min-h-screen relative flex'>
      {/* Uncomment if you have a Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar onUser Select={handleUserSelect} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-0`}>
        <Chat />
      </div>
    </div>
  );
}

export default App;