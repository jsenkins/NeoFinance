import { useState } from 'react';
import { useRegisterMutation } from '../store/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';  // ← updated import
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await register(form).unwrap();
      dispatch(setCredentials({ token }));    // ← dispatch with the correct action
      nav('/');                               
    } catch (err) {
      setError(err?.data?.message || err?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-base-100 p-8 rounded-xl shadow-sm border border-base-300">
        <div>
          <h2 className="text-3xl font-bold text-center">Create Account</h2>
          <p className="mt-2 text-center text-base-content/70">
            Start managing your finances
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
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
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              className="input input-bordered w-full"
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
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
