import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import broLendLogo from '../../assets/images/bro-lend-logo.png';
import {
  Bell,
  PlusCircle,
  ChevronDown,
  User,
  LogOut,
  Package,
  Layers,
  ArrowRightLeft,
  Heart
} from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const { user, currentMode, switchMode, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModeSwitch = (newMode) => {
    switchMode(newMode);
    if (newMode === 'lender') {
      navigate('/lender');
    } else {
      navigate('/explore');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">


        <div className="navbar-left">
          <Link to={currentMode === 'lender' ? '/lender' : '/'} className="navbar-brand">
            <img src={broLendLogo} alt="Bro Lend Logo" className="brand-logo-img" />
          </Link>

          <div className="mode-switcher-pill">
            <button
              type="button"
              className={`mode-btn ${currentMode === 'borrower' ? 'active' : ''}`}
              onClick={() => handleModeSwitch('borrower')}
            >
              <Package size={14} />
              <span>Borrow</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${currentMode === 'lender' ? 'active' : ''}`}
              onClick={() => handleModeSwitch('lender')}
            >
              <Layers size={14} />
              <span>Lend</span>
            </button>
          </div>
        </div>

        <nav className="navbar-center-nav">
          {currentMode === 'borrower' ? (
            <>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
              <Link to="/explore" className={`nav-link ${isActive('/explore') ? 'active' : ''}`}>
                Browse
              </Link>
              <Link to="/requests" className={`nav-link ${isActive('/requests') ? 'active' : ''}`}>
                Requests
              </Link>
              <Link to="/my-rentals" className={`nav-link ${isActive('/my-rentals') ? 'active' : ''}`}>
                My Rentals
              </Link>
            </>
          ) : (
            <>
              <Link to="/lender" className={`nav-link ${isActive('/lender') ? 'active' : ''}`}>
                Home
              </Link>
              <Link to="/lender/add-item" className={`nav-link ${isActive('/lender/add-item') ? 'active' : ''}`}>
                List
              </Link>
              <Link to="/lender/listings" className={`nav-link ${isActive('/lender/listings') ? 'active' : ''}`}>
                My Listings
              </Link>
            </>
          )}
        </nav>

        <div className="navbar-right">

          {currentMode === 'borrower' ? (
            <Link to="/request-equipment" className="btn btn-primary navbar-cta-btn">
              <PlusCircle size={16} />
              <span>Request Gear</span>
            </Link>
          ) : (
            <Link to="/lender/add-item" className="btn btn-primary navbar-cta-btn">
              <PlusCircle size={16} />
              <span>List Gear</span>
            </Link>
          )}

          <div className="relative-container" ref={notifRef}>
            <button
              type="button"
              className="icon-circle-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={18} />
              <span className="notif-badge">2</span>
            </button>

            {showNotifications && (
              <div className="dropdown-popover notif-popover">
                <div className="popover-header">
                  <span className="font-bold text-sm">Notifications</span>
                </div>
                <div className="notif-list">
                  <div className="notif-item unread">
                    <div className="notif-bullet"></div>
                    <div className="notif-content">
                      <p className="notif-text"><strong>Aarav Patel</strong> accepted your rental request for <strong>Sony Alpha A7 III</strong>.</p>
                      <span className="notif-time">10 minutes ago</span>
                    </div>
                  </div>
                  <div className="notif-item unread">
                    <div className="notif-bullet"></div>
                    <div className="notif-content">
                      <p className="notif-text">Reminder: Return <strong>Texas Instruments TI-Nspire</strong> by tomorrow 5 PM.</p>
                      <span className="notif-time">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="icon-circle-btn"
            onClick={() => navigate('/favorites')}
            title="Saved Items"
          >
            <Heart size={18} />
          </button>

          <div className="relative-container" ref={userMenuRef}>
            <button
              type="button"
              className="user-profile-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User Avatar'}
                className="user-avatar-img"
              />
              <span className="user-name-text">{user?.name?.split(' ')[0] || 'Account'}</span>
              <ChevronDown size={14} className="chevron-icon" />
            </button>

            {showUserMenu && (
              <div className="dropdown-popover user-menu-popover">
                <div className="user-menu-header">
                  <p className="user-full-name font-bold">{user?.name || 'Alex Rivera'}</p>
                  <p className="user-meta text-xs text-muted">{user?.department || 'Student'}</p>
                  <div className="user-balance-badge">
                    <span>Balance: <strong>₹{user?.walletBalance?.toFixed(2) || '84.50'}</strong></span>
                  </div>
                </div>

                <div className="menu-divider"></div>

                <div className="user-menu-links">
                  <Link
                    to="/profile"
                    className="user-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} />
                    <span>My Campus Profile</span>
                  </Link>

                  <button
                    type="button"
                    className="user-menu-item switch-role-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      handleModeSwitch(currentMode === 'borrower' ? 'lender' : 'borrower');
                    }}
                  >
                    <ArrowRightLeft size={16} />
                    <span>Switch to {currentMode === 'borrower' ? 'Lender Mode' : 'Borrower Mode'}</span>
                  </button>

                  <div className="menu-divider"></div>

                  <button
                    type="button"
                    className="user-menu-item text-danger"
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                      navigate('/login');
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
