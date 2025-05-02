
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="sticky top-0 z-30 w-full">
            <Navbar>
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
            </Navbar>
          </div>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
