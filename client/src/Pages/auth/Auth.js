import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../Img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpass: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', general: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (isSignUp) {
      if (!data.firstname.trim()) newErrors.firstname = 'First name is required';
      if (!data.lastname.trim()) newErrors.lastname = 'Last name is required';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp && data.password !== data.confirmpass) {
      newErrors.confirmpass = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (isSignUp) {
          await dispatch(signUp(data));
        } else {
          await dispatch(logIn(data));
        }
      } catch (error) {
        const message = error?.response?.data?.message || 'Something went wrong';
        setErrors((prev) => ({ ...prev, general: message }));
      }
    }
  };

  const resetForm = () => {
    setData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpass: '',
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="auth-container dark-theme">
      <div className="auth-card">
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
        </div>

        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && <span className="error-text">{errors.general}</span>}

          {isSignUp && (
            <div className="name-inputs">
              <div style={{ width: '100%' }}>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && <span className="error-text">{errors.firstname}</span>}
              </div>
              <div style={{ width: '100%' }}>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <span className="error-text">{errors.lastname}</span>}
              </div>
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          {/* Password Field */}
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}

          {isSignUp && (
            <>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name="confirmpass"
                  value={data.confirmpass}
                  onChange={handleChange}
                />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmpass && <span className="error-text">{errors.confirmpass}</span>}
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>

          <p className="toggle-text" onClick={() => { setIsSignUp(prev => !prev); resetForm(); }}>
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
