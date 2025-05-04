import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bell, LogOut, Settings, Home, ArrowLeftRight, PieChart,
  Receipt, Wallet, CreditCard, BarChart, Mail, Menu
} from 'lucide-react';
import { logout } from '../store/authSlice';

const mobileLinks = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/budgets', icon: PieChart, label: 'Budgets' },
  { to: '/bills', icon: Receipt, label: 'Bills' },
  { to: '/debts', icon: Wallet, label: 'Debts' },
  { to: '/credits', icon: CreditCard, label: 'Credits' },
  { to: '/reports', icon: BarChart, label: 'Reports' },
  { to: '/contact', icon: Mail, label: 'Contact' }
];

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="navbar w-full bg-[#001e30] border-b px-4">
      {/* Left: Brand + Hamburger */}
      <div className="navbar-start flex items-center gap-2">
        {/* Hamburger for small screens */}
        <div className="lg:hidden">
          <button onClick={() => setShowMobileMenu((v) => !v)} className="btn btn-ghost btn-circle hover: bg-[#001e30]">
            <Menu className="h-5 w-5 text-white" />
          </button>
          {showMobileMenu && (
            <ul className="absolute mt-2 z-50 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-56">
              {mobileLinks.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <Link to={to} className="flex items-center gap-3 px-2 py-1 hover:bg-base-200 rounded">
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="text-xl font-bold text-primary text-white">Neo Finance</span>
      </div>

      {/* Right: Icons and Avatar */}
      <div className="navbar-end">
        <div className="flex items-center gap-2">
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
              <ul className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
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
