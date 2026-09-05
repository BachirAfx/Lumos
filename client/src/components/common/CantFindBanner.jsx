import { Link } from 'react-router-dom';
import bannerGraphic from '../../assets/images/cantFind.png';
import './CantFindBanner.css';

export const CantFindBanner = () => {
  return (
    <div className="cant-find-banner-wrapper">
      <div className="cant-find-banner-card">
        {/* Left Graphic */}
        <div className="banner-graphic-col">
          <img
            src={bannerGraphic}
            alt="Can't find what you need?"
            className="banner-illustration-img"
          />
        </div>

        {/* Vertical Divider */}
        <div className="banner-divider" />

        {/* Right Info & CTA */}
        <div className="banner-info-col">
          <div className="banner-text-block">
            <p className="banner-lead-text">Post a request and let the community know.</p>
            <p className="banner-sub-text">Someone nearby might have it!</p>
          </div>
          <Link to="/request-equipment" className="banner-request-cta-btn">
            <span>Request Equipment</span>
            <span className="cta-arrow">&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
