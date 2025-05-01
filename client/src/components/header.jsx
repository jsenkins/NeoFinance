import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pfpImage from '../assets/pfp.jpg';
import '../pages/basics.css';
import Sidebar from './Sidebar'; // Import Sidebar

const Header = ({ username }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle Sidebar state
    const onToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            {/* Sidebar Component */}
            
            <header className="header">
                <div className="header-left">
                    <Sidebar isOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar} />

                   
                    
                    <h2 className="ml-2">NeoFinance</h2>
                </div>
                <div className="header-right">
                    <Link to="/profile" className="button profile-link">
                        <img src={pfpImage} alt="Profile" className="profile-image" />
                        <span className="username">{username}</span>
                    </Link>
                    <Link to="/" className="logout-link">Logout</Link>
                </div>
            </header>
        </div>
    );
};

export default Header;
