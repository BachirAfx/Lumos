import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import broLendLogo from '../../assets/images/bro-lend-logo.png';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  MapPin
} from 'lucide-react';
import './SignUpPage.css';

export const SignUpPage = () => {
  const { signup, currentMode } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid university email address');
      return false;
    }

    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password
      });

      if (result.success) {
        if (currentMode === 'lender') {
          navigate('/lender');
        } else {
          navigate('/');
        }
      } else {
        setError(result.error || 'Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('Registration error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-canvas">
      <div className="signup-main-wrapper">

        <div className="signup-card-container">
          <h1 className="signup-welcome-title">Create Account</h1>

          {error && (
            <div className="signup-error-badge">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="signup-form-stack" noValidate>

            <div className="signup-field-group">
              <label className="signup-field-label">Full Name</label>
              <div className="signup-input-wrap">
                <User size={16} className="signup-input-icon" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="signup-input"
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="signup-field-group">
              <label className="signup-field-label">University Email</label>
              <div className="signup-input-wrap">
                <Mail size={16} className="signup-input-icon" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your University Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="signup-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="signup-field-group">
              <label className="signup-field-label">Password</label>
              <div className="signup-input-wrap">
                <Lock size={16} className="signup-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Create a Password (min. 6 chars)"
                  value={formData.password}
                  onChange={handleChange}
                  className="signup-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="signup-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="signup-field-group">
              <label className="signup-field-label">Confirm Password</label>
              <div className="signup-input-wrap">
                <Lock size={16} className="signup-input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  placeholder="Re-enter Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="signup-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="signup-eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="signup-btn-row">
              <button
                type="submit"
                className="signup-submit-navy-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="signup-switch-auth-row">
              <span>Already have an account? </span>
              <Link to="/login" className="signup-switch-auth-link">
                Log in
              </Link>
            </div>

          </form>
        </div>

        <div className="signup-showcase-panel">
          <div className="signup-showcase-header">
            <img src={broLendLogo} alt="Bro Lend Logo" className="signup-showcase-logo" />
            <span className="signup-showcase-badge">Campus Gear Share</span>
          </div>

          <h2 className="signup-showcase-title">
            Join Your Verified Campus Gear Community
          </h2>
          <p className="signup-showcase-desc">
            Sign up with your university email to access shared cameras, lab gear, calculators, and electronics across campus.
          </p>

          <div className="signup-features-list">
            <div className="signup-feature-card">
              <div className="signup-feature-icon-box icon-purple">
                <ShieldCheck size={20} />
              </div>
              <div className="signup-feature-content">
                <h3 className="signup-feature-title">100% Student Verified</h3>
                <p className="signup-feature-text">
                  Sign up with your official university email to join trusted campus circles.
                </p>
              </div>
            </div>

            <div className="signup-feature-card">
              <div className="signup-feature-icon-box icon-amber">
                <Sparkles size={20} />
              </div>
              <div className="signup-feature-content">
                <h3 className="signup-feature-title">Earn or Save Cash</h3>
                <p className="signup-feature-text">
                  Monetize your unused gear or rent what you need for projects at student-friendly daily rates.
                </p>
              </div>
            </div>

            <div className="signup-feature-card">
              <div className="signup-feature-icon-box icon-emerald">
                <MapPin size={20} />
              </div>
              <div className="signup-feature-content">
                <h3 className="signup-feature-title">Simple Campus Pickups</h3>
                <p className="signup-feature-text">
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
