import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import { useLoginMutation } from '../store/api';
import './basics.css'
export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData).unwrap();
      dispatch(setCredentials({ token: data.token }));
      navigate('/');
    } catch (err) {
      setError(err?.data?.message || err?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#001e30] flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-sm border border-base-300 basic-container">
        <div > 
          <h2 className="text-3xl font-bold text-center">Welcome to NeoFinance</h2>
          <p className="mt-2 text-center text-base-content/70">
            Please enter your credentials to sign in to your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div>
            <input
              type="email"
              className="input input-bordered w-full text-black"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <input
              type="password"
              className="input input-bordered w-full text-black"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="yes"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Register button below the form */}
        <div className="pt-4">
          <p className="text-left text-base-content/70 mb-2">
            Not yet a member ?
            <small><i>(you should be !)</i></small>
          </p>
          <Link
          
            to="/register"
            className="linkButton"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
