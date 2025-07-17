import React, { useState } from 'react';
import './Loginform.css';

function Loginform() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
    isValid = false;
  }

    // Password validation using regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 6 characters long, include uppercase, lowercase, number, and special character.';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      alert(`Logging in with ${formData.email}`);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="logo">◉</div>
        <h2>Welcome Back!</h2>
        <p>Let's get you signed in securely.</p>

        <button className="social-btn google">
          <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" />
          Continue with Google
        </button>

        <button className="social-btn facebook">
          <img src="https://img.icons8.com/color/16/facebook.png" alt="Facebook" />
          Continue with Facebook
        </button>

        <div className="divider">Or</div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <div className="password-section">
            <label>Password</label>
            <button
              className="forgot-link"
              type="button"
              onClick={() => alert('Redirect to Forgot Password')}
            >
              Forgot Your Password?
            </button>
          </div>

          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </span>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit" className="email-login-btn">
            Log in with Email
          </button>
        </form>

        <p className="signup-prompt">
          Don’t Have an Account?{' '}
          <button className="signup-link" onClick={() => alert('Redirect to Sign Up')}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Loginform;
