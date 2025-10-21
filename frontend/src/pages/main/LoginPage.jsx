import React, { useState, useEffect } from 'react';

const Login = () => {
    const [dashboardType, setDashboardType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDemo, setShowDemo] = useState(false);

    useEffect(() => {
        // Show demo credentials after 3 seconds
        const timer = setTimeout(() => {
            setShowDemo(true);
            // Auto-hide after 10 seconds
            setTimeout(() => {
                setShowDemo(false);
            }, 10000);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const isFormValid = dashboardType && email.trim() && password.trim();

    const getDashboardName = (value) => {
        const names = {
            'admin': 'Admin Dashboard',
            'parent': 'Parent Dashboard',
            'partner': 'Partner Dashboard'
        };
        return names[value] || 'Dashboard';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        // Simulate login process
        setTimeout(() => {
            alert(`Login simulation:\n\nDashboard: ${getDashboardName(dashboardType)}\nEmail: ${email}\n\nRedirecting to your dashboard...`);

            setIsLoading(false);

            // In a real app, you would redirect to the appropriate dashboard:
            // window.location.href = `/dashboard/${dashboardType}`;
        }, 2000);
    };

    const getButtonText = () => {
        if (isLoading) return 'Logging in...';
        if (dashboardType && isFormValid) return `Access ${getDashboardName(dashboardType)}`;
        return 'Sign In';
    };

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
                            <label htmlFor="dashboardType" className="form-label">Select Dashboard</label>
                            <select
                                id="dashboardType"
                                className="form-select"
                                value={dashboardType}
                                onChange={(e) => setDashboardType(e.target.value)}
                                required
                            >
                                <option value="">Choose your dashboard type...</option>
                                <option value="admin">Admin Dashboard</option>
                                <option value="parent">Internal Parent Dashboard</option>
                                <option value="partner">External Partner Dashboard</option>
                            </select>

                            {/* Dashboard Info Boxes */}
                            <div className={`dashboard-info ${dashboardType === 'admin' ? 'active' : ''}`}>
                                <div className="dashboard-title">Admin Dashboard</div>
                                <div className="dashboard-description">
                                    Full administrative access for Malaika House staff and directors
                                </div>
                                <div className="dashboard-features">
                                    <ul className="feature-list">
                                        <li>Complete user management</li>
                                        <li>System analytics and reports</li>
                                        <li>Content management</li>
                                        <li>Payment and subscription oversight</li>
                                        <li>Integration management</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`dashboard-info ${dashboardType === 'parent' ? 'active' : ''}`}>
                                <div className="dashboard-title">Internal Parent Dashboard</div>
                                <div className="dashboard-description">
                                    For parents with children enrolled in Malaika House programs
                                </div>
                                <div className="dashboard-features">
                                    <ul className="feature-list">
                                        <li>Child progress tracking</li>
                                        <li>Session booking and management</li>
                                        <li>Subscription and payment management</li>
                                        <li>Direct communication with staff</li>
                                        <li>Session reports and updates</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`dashboard-info ${dashboardType === 'partner' ? 'active' : ''}`}>
                                <div className="dashboard-title">External Partner Dashboard</div>
                                <div className="dashboard-description">
                                    For external organizations and club partners
                                </div>
                                <div className="dashboard-features">
                                    <ul className="feature-list">
                                        <li>External club management</li>
                                        <li>Limited participant overview</li>
                                        <li>Session scheduling and coordination</li>
                                        <li>Communication with Malaika House</li>
                                        <li>Partnership resources and guidelines</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

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

                        <button
                            type="submit"
                            className="login-button"
                            disabled={!isFormValid || isLoading}
                        >
                            {getButtonText()}
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

            {/* Demo Credentials Info */}
            {showDemo && (
                <div className="demo-info">
                    <strong>Demo Credentials:</strong><br />
                    Email: demo@malaikahouse.com<br />
                    Password: demo123<br />
                    <small>Works with any dashboard type</small>
                </div>
            )}
        </div>
    );
};

export default Login;