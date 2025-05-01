import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import navigation hook
import './Profile.css';
import './basics.css'; // Common styles
import pfpImage from '../assets/pfp.jpg'; // Importing the profile picture



const Profile = () => {
    const navigate = useNavigate(); // Initialize navigate

    const user = {
        profilePicture: pfpImage,
        username: 'Javeria Shahid',
        email: 'javeria@example.com',
        joinDate: 'January 15, 2023',
        totalIncome: '50,000',
        totalExpenses: '32,000',
    };

    return (
        <div className='fullWindow'>
            
            <div className="profile-page">
                <div className="profile-card">
                    <img src={user.profilePicture} alt="Profile" className="profile-pic" />
                    <button className='edit-button'>Edit Profile</button>
                    <button className='edit-button' onClick={() => navigate('/login')} >Logout</button>

                    <h2 className="profile-username">{user.username}</h2>
                    <p className="profile-email">{user.email}</p>

                    <div className="profile-details">
                        <div className="detail">
                            <span className="detail-label">Joined:</span>
                            <span>{user.joinDate}</span>
                        </div>
                        <div className="detail">
                            <span className="detail-label">Total Income:</span>
                            <span>${user.totalIncome}</span>
                        </div>
                        <div className="detail">
                            <span className="detail-label">Total Expenses:</span>
                            <span>${user.totalExpenses}</span>
                        </div>
                    </div>



                    {/* New Buttons */}
                    <button className="nav-button" onClick={() => navigate('/bills')}>
                        View Bills Due
                    </button>
                    <button className="nav-button" onClick={() => navigate('/analytics')}>
                        View Financial Analytics
                    </button>
                    <button className="nav-button" onClick={() => navigate('/budgeting')}>
                        Go to budgeting
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
