import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './basics.css';
import './login.css';

const Login = () => {
    const navigate = useNavigate();

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [progress, setProgress] = useState(100);
    const [, setIntervalId] = useState(null);
    const [errorFields, setErrorFields] = useState({ email: false, password: false });

    useEffect(() => {
        if (message) {
            setShowBanner(true);
            setProgress(100);

            const id = setInterval(() => {
                setProgress((prev) => prev - 1);
            }, 50);

            setIntervalId(id);

            const timeoutId = setTimeout(() => {
                clearInterval(id);
                setShowBanner(false);
                setIntervalId(null);
            }, 5000);

            return () => {
                clearInterval(id);
                clearTimeout(timeoutId);
            };
        }
    }, [message]);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (!email || !password) {
            setMessage('You need to provide both email and password');
            setMessageType('failure');
            setErrorFields({
                email: !email,
                password: !password,
            });
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', res.data.token);
            setMessage('Login successful!');
            setMessageType('success');
            setEmail('');
            setPassword('');
            setErrorFields({ email: false, password: false });

            navigate('/dashboard');

        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
            setMessageType('failure');
        } finally {
            setLoading(false);
        }
    };

    // Initial Welcome Screen
    if (!showLoginForm) {
        return (
            <div className="login-container">
                <h2>Welcome to NeoFinance</h2>
                <div className="welcome-buttons">
                    <button type="login" onClick={() => setShowLoginForm(true)}>Login</button>
                    <button type="signup" onClick={() => navigate('/register')}>Sign Up</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <button className="back-button" onClick={() => setShowLoginForm(false)}>Reload</button>

            <div className="login-container">
                {showBanner && (
                    <div className={`banner ${messageType === 'success' ? 'banner-success' : 'banner-error'}`}>
                        {message}
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className={errorFields.email ? 'input-error' : ''}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className={errorFields.password ? 'input-error' : ''}
                        />
                    </div>
                    <button type="login" disabled={loading} onClick={handleLogin} className="login-button">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div>
                        Not yet a member?
                        <button type="signup" disabled={loading} onClick={() => navigate('/register')} className="signup-button">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
