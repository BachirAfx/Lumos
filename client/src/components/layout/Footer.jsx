import { Link } from 'react-router-dom';
import broLendLogo from '../../assets/images/bro-lend-logo.png';
import { Heart, ShieldCheck, Sparkles, MapPin, Award } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">

        <div className="footer-grid">

          <div className="footer-brand-col">
            <img src={broLendLogo} alt="Bro Lend Logo" className="footer-logo-img" />
            <p className="footer-bio-text">
              The premier peer-to-peer campus gear sharing network. Empowering students, creators, and researchers to share tools, save money, and build community.
            </p>
            <div className="campus-badge">
              <MapPin size={14} className="text-primary-color" />
              <span>Campus Wide Network • Verified Students Only</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Gear Categories</h4>
            <ul className="footer-links">
              <li><Link to="/explore?category=electronics">Cameras & Audio</Link></li>
              <li><Link to="/explore?category=bicycle">Bikes & Mobility</Link></li>
              <li><Link to="/explore?category=academics">Calculators & Textbooks</Link></li>
              <li><Link to="/explore?category=tools">Makerspace & Lab Tools</Link></li>
              <li><Link to="/explore?category=clothes">Lab Coats & Safety Gear</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Trust & Security</h4>
            <ul className="footer-links">
              <li><Link to="/how-it-works">How Sharing Works</Link></li>
              <li><Link to="/how-it-works#guarantee">Campus Damage Protection</Link></li>
              <li><Link to="/how-it-works#verification">Student ID Verification</Link></li>
              <li><Link to="/requests">Community Need Board</Link></li>
              <li><Link to="/guidelines">Community Guidelines</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Lender Program</h4>
            <ul className="footer-links">
              <li><Link to="/lender/add-item">List Your Spare Equipment</Link></li>
              <li><Link to="/lender">Lender Dashboard</Link></li>
              <li><Link to="/lender/earnings">Earnings Calculator</Link></li>
              <li><Link to="/lender/insurance">Host Protection Pledge</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Rovo Campus Gear Sharing Network. Built with passion for campus innovators.
          </p>
          <div className="footer-features-badges">
            <div className="badge-item">
              <ShieldCheck size={14} />
              <span>100% Verified Campus Identity</span>
            </div>
            <div className="badge-item">
              <Award size={14} />
              <span>Peer-Rated Reputation</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
