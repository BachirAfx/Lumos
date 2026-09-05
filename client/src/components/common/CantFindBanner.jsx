import { Link } from 'react-router-dom';
import bannerGraphic from '../../assets/images/cant-find-banner-graphic.png';
import { Sparkles, ArrowRight } from 'lucide-react';
import './CantFindBanner.css';

export const CantFindBanner = () => {
  return (
    <div className="cant-find-banner card-brutal">
      <div className="banner-content-side">
        <div className="banner-badge">
          <Sparkles size={14} />
          <span>Campus Need Board</span>
        </div>
        <h3 className="banner-title font-display">Can&apos;t find what you need?</h3>
        <p className="banner-subtitle">
          Post an equipment request to fellow students & faculty. Someone on campus probably has exactly what you need sitting in their dorm or lab!
        </p>
        <div className="banner-actions-group">
          <Link to="/request-equipment" className="btn btn-yellow banner-cta-btn">
            <span>Post a Request</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/requests" className="banner-secondary-link">
            Browse Active Student Requests →
          </Link>
        </div>
      </div>

      <div className="banner-graphic-side">
        <img
          src={bannerGraphic}
          alt="Can't find gear illustration"
          className="banner-illustration-img"
        />
      </div>
    </div>
  );
};
