import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import { useLoginMutation } from '../store/api';

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
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-base-100 p-8 rounded-xl shadow-sm border border-base-300">
        <div>
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="mt-2 text-center text-base-content/70">
            Sign in to your account
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
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
          <p className="text-center text-base-content/70 mb-2">
            Don’t have an account?
          </p>
          <Link
            to="/register"
            className="btn btn-outline btn-secondary w-full"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
