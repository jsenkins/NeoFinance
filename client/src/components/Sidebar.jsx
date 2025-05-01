import React, { useState } from 'react';

import '../pages/basics.css';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? '≡' : '≡'}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        
        <h3>Menu</h3>
        <ul>

          <li><a href="/budgeting">Budgeting</a></li>
          <li><a href="/analytics">Analytics</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          Close</button>

      </div>
    </div>
  );
};

export default Sidebar;
