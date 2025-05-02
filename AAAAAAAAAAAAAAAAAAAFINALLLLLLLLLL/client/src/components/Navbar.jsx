// client/src/components/Navbar.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus, Search, Settings, LogOut } from 'lucide-react';
import { logout } from '../store/authSlice';

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="navbar w-full bg-base-100 border-b px-4">
      {/* Left: your brand */}
      <div className="navbar-start">
        <span className="text-xl font-bold text-primary">Neo Finance</span>
      </div>

      {/* Right: action buttons + avatar */}
      <div className="navbar-end">
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-circle">
            <Plus className="h-5 w-5" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Search className="h-5 w-5" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Bell className="h-5 w-5" />
          </button>

          <div className="dropdown dropdown-end">
            <button
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setShowDropdown((v) => !v)}
            >
              <div className="w-10 rounded-full bg-primary text-white grid place-items-center">
                NF
              </div>
            </button>
            {showDropdown && (
              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <button className="flex items-center w-full px-2 py-1 hover:bg-base-200 rounded">
                    <Settings className="h-4 w-4 mr-2" /> Settings
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center w-full px-2 py-1 hover:bg-base-200 rounded"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
