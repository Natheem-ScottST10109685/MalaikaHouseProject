import React, { useState } from 'react';
import { apiFetch, setAccessToken } from '../../lib/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = email.trim() && password.trim();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.error?.code === 'INVALID_CREDENTIALS') {
          throw new Error('Incorrect email or password.');
        }
        throw new Error('Could not sign in. Please try again.');
      }

      const data = await res.json();
      setAccessToken(data.accessToken);
      sessionStorage.setItem('userRole', data.user?.role ?? '');

      const destination =
        data.dashboard ?? (data.user?.role === 'ADMIN' ? '/admin' : '/parent');
      window.location.assign(destination);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Branding Section */}
        <div className="branding-section">
          <div className="brand-content">
            <a href="index.html" className="logo">
              <img
                src="https://i.postimg.cc/D09ZbnHD/2022-12-10-Malaika-House-Main-Logo-PNG-RGB.png"
                alt="Malaika House Logo"
              />
            </a>
            <p className="brand-tagline">
              Empowering neurodivergent children and their families through specialized support and community connection
            </p>

            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Heart Program Sessions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👥</span>
                <span>Community Support</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span>Progress Tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <span>Partnership Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className="login-section">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Please login below to enter the website</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {error && (
              <div className="form-group" role="alert" style={{ color: '#c00', marginTop: 8 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Logging in...' : 'Sign In'}
            </button>

            <div className="forgot-password">
              <a href="#forgot">Forgot your password?</a>
            </div>
          </form>

          <div className="support-info">
            <div className="support-title">Need Help?</div>
            <div className="support-text">
              Contact our support team for assistance with account access or technical issues
            </div>
            <a href="mailto:support@malaikahouse.com" className="support-contact">
              support@malaikahouse.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;