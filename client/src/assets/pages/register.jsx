import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './basics.css';
import './register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        nationalId: '',
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [progress, setProgress] = useState(100);
    const [intervalId, setIntervalId] = useState(null);
    const [errorFields, setErrorFields] = useState({});
    const [showContainer, setShowContainer] = useState(false);

    useEffect(() => {
        if (message && messageType === 'failure') {
            setShowBanner(true);
            setProgress(100);

            const id = setInterval(() => {
                setProgress((prev) => prev - 1);
            }, 50);

            setIntervalId(id);

            setTimeout(() => {
                clearInterval(id);
                setShowBanner(false);
            }, 5000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId, message, messageType]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContainer(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { name, email, password, confirmPassword, age, nationalId } = formData;

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{10,}$/;
        const nationalIdRegex = /^\d{5}-\d{7}-\d{1}$/;  // Regex for the format xxxxx-xxxxxxx-x

        if (!name || !email || !password || !confirmPassword || !age || !nationalId) {
            setMessage('All fields are required!');
            setMessageType('failure');
            setErrorFields({
                name: !name,
                email: !email,
                password: !password,
                confirmPassword: !confirmPassword,
                age: !age,
                nationalId: !nationalId,
            });
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            setMessageType('failure');
            setErrorFields({ password: true, confirmPassword: true });
            setLoading(false);
            return;
        }

        if (!passwordRegex.test(password)) {
            setMessage('Password must be at least 10 characters long, include 1 uppercase letter, 1 number, and 1 special character!');
            setMessageType('failure');
            setErrorFields({ password: true });
            setLoading(false);
            return;
        }

        if (!nationalIdRegex.test(nationalId)) {
            setMessage('National ID must be in the format xxxxx-xxxxxxx-x (all digits)');
            setMessageType('failure');
            setErrorFields({ nationalId: true });
            setLoading(false);
            return;
        }

        try {
            // Backend request for user registration (handle backend here)
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);

            // Save the token received from backend to localStorage
            localStorage.setItem('token', res.data.token);

            setMessage('Registration successful!');
            setMessageType('success');

            // Clear form data and error fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                age: '',
                nationalId: '',
            });
            setErrorFields({});

            // Redirect to login page after 1.5 seconds
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            // Backend error handling (handle backend here)
            setMessage(error.response?.data?.message || 'Registration failed');
            setMessageType('failure');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='page-wrapper'>
            <button className="back-button" onClick={() => navigate('/')}>⬅ Home
            </button>
            
                 

            <div className={`register-container ${showContainer ? 'fade-in' : 'hidden'}`}>
                {showBanner && (
                    <div className="banner banner-error">
                        {message}
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <h2>Enter your details to sign up for NeoFinance today !</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            required
                            onChange={handleChange}
                            className={errorFields.name ? 'input-error' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            className={errorFields.email ? 'input-error' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <small class="requirements">
                            Password must
                            <li>be at least 10 characters long</li>
                            <li> include 1 uppercase letter</li>
                            <li> include 1 number</li>
                            <li>include 1 special character</li>
                        </small>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            required
                            onChange={handleChange}
                            className={errorFields.password ? 'input-error' : ''}
                        />
                        
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            required
                            onChange={handleChange}
                            className={errorFields.confirmPassword ? 'input-error' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth</label>
                        <small class="requirements">
                            <i> </i>
                        </small>
                        <input
                            type="date"
                            name="age"
                            value={formData.age}
                            max="2010-12-31"
                            required
                            onChange={handleChange}
                            className={errorFields.age ? 'input-error' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>National ID</label>
                       
                        <input
                            type="text"
                            name="nationalId"
                            value={formData.nationalId}
                            required
                            placeholder='00000-0000000-0'
                            onChange={handleChange}
                            className={errorFields.nationalId ? 'input-error' : ''}
                        />
                    </div>

                    <button type="signup" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <div >
                        Already have an account?
                        <button
                            type="login"
                            className="button"
                            onClick={() => navigate('/')}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
