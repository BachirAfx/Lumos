import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import broLendLogo from '../../assets/images/bro-lend-logo.png';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import './LoginPage.css';

export const LoginPage = () => {
  const { login, currentMode } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        if (currentMode === 'lender') {
          navigate('/lender');
        } else {
          navigate('/');
        }
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-canvas">
      <div className="login-main-wrapper">

        <div className="login-card-container">
          <h1 className="login-welcome-title">Welcome</h1>

          {error && (
            <div className="login-error-badge">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {forgotSent && (
            <div className="login-info-badge">
              <span>Password reset link sent to your campus email!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form-stack">

            <div className="login-field-group">
              <label className="login-field-label">Email</label>
              <div className="login-input-wrap">
                <Mail size={16} className="login-input-icon" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your University Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-field-group">
              <label className="login-field-label">Password</label>
              <div className="login-input-wrap">
                <Lock size={16} className="login-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="login-input"
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="login-forgot-row">
              <button
                type="button"
                className="login-forgot-btn"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <div className="login-btn-row">
              <button
                type="submit"
                className="login-submit-navy-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="login-switch-auth-row">
              <span>Don't have an account? </span>
              <Link to="/signup" className="login-switch-auth-link">
                Sign up
              </Link>
            </div>

          </form>
        </div>

        <div className="login-showcase-panel">
          <div className="login-showcase-header">
            <img src={broLendLogo} alt="Bro Lend Logo" className="login-showcase-logo" />
            <span className="login-showcase-badge">Campus Gear Share</span>
          </div>

          <h2 className="login-showcase-title">
            Share Equipment, Save Money & Connect Across Campus
          </h2>
          <p className="login-showcase-desc">
            Rent cameras, calculators, lab gear, and project essentials directly from verified university students.
          </p>

          <div className="login-features-list">
            <div className="login-feature-card">
              <div className="login-feature-icon-box icon-purple">
                <ShieldCheck size={20} />
              </div>
              <div className="login-feature-content">
                <h3 className="login-feature-title">100% Verified Campus</h3>
                <p className="login-feature-text">
                  Sign in with your official university email for trusted, accountable peer sharing.
                </p>
              </div>
            </div>

            <div className="login-feature-card">
              <div className="login-feature-icon-box icon-amber">
                <Sparkles size={20} />
              </div>
              <div className="login-feature-content">
                <h3 className="login-feature-title">Affordable Daily Rentals</h3>
                <p className="login-feature-text">
                  Access high-value gear at student-friendly daily rates with campus trust protection.
                </p>
              </div>
            </div>

            <div className="login-feature-card">
              <div className="login-feature-icon-box icon-emerald">
                <MapPin size={20} />
              </div>
              <div className="login-feature-content">
                <h3 className="login-feature-title">Convenient Campus Pickups</h3>
                <p className="login-feature-text">
                  Coordinate handovers right at campus libraries, department lobbies, and student centers.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
