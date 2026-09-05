import { Link } from 'react-router-dom';
import { MessageCircle, Clock, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import './RequestCard.css';

export const RequestCard = ({ request }) => {
  const {
    id,
    title,
    category,
    urgency,
    budgetPerDay,
    requiredDuration,
    requesterName,
    requesterAvatar,
    requesterDepartment,
    description,
    responsesCount,
    createdAt,
    status
  } = request;

  const urgencyConfig = {
    high: { label: 'Urgent', color: 'badge-rented' },
    medium: { label: 'Moderate', color: 'badge-pending' },
    low: { label: 'Flexible', color: 'badge-available' }
  };

  const urgencyBadge = urgencyConfig[urgency] || urgencyConfig.medium;

  return (
    <div className="request-card card card-brutal">
      <Link to={`/requests/${id}`} className="request-card-link">

        {/* Header with Urgency & Category */}
        <div className="request-card-header">
          <span className={`badge ${urgencyBadge.color}`}>
            <AlertCircle size={12} />
            {urgencyBadge.label}
          </span>
          <span className="request-category-chip">{category}</span>
        </div>

        {/* Request Title */}
        <h3 className="request-title-text">{title}</h3>

        {/* Requester Info */}
        <div className="request-requester-row">
          <img src={requesterAvatar} alt={requesterName} className="requester-avatar" />
          <div className="requester-info">
            <span className="requester-name font-semibold">{requesterName}</span>
            <span className="requester-dept text-muted">{requesterDepartment}</span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="request-description-preview">{description}</p>

        {/* Meta Info Grid */}
        <div className="request-meta-grid">
          <div className="meta-item">
            <DollarSign size={14} className="meta-icon" />
            <div className="meta-content">
              <span className="meta-label">Budget</span>
              <span className="meta-value">₹{budgetPerDay}/day</span>
            </div>
          </div>

          <div className="meta-item">
            <Calendar size={14} className="meta-icon" />
            <div className="meta-content">
              <span className="meta-label">Duration</span>
              <span className="meta-value">{requiredDuration}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="request-card-footer">
          <div className="request-responses-info">
            <MessageCircle size={14} />
            <span className="responses-text">
              {responsesCount > 0 ? `${responsesCount} Response${responsesCount > 1 ? 's' : ''}` : 'Be the first to help'}
            </span>
          </div>
          <div className="request-time-posted">
            <Clock size={12} />
            <span className="time-text">{createdAt}</span>
          </div>
        </div>

      </Link>
    </div>
  );
};
