import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';
import './EquipmentCard.css';

export const EquipmentCard = ({ equipment, onBorrowClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    id,
    title,
    category,
    pricePerDay,
    deposit,
    rating,
    reviewCount,
    status,
    ownerName,
    ownerAvatar,
    ownerDepartment,
    location,
    images
  } = equipment;

  const isAvailable = status === 'available';

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="equipment-card card">
      <Link to={`/equipment/${id}`} className="equipment-card-link">

        <div className="card-image-wrapper">
          <img
            src={images[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80'}
            alt={title}
            className="equipment-thumbnail-img"
          />

          <div className="status-badge-container">
            <span className={`badge ${isAvailable ? 'badge-available' : 'badge-lent'}`}>
              {isAvailable ? 'Available' : 'Lent'}
            </span>
          </div>

          <button
            type="button"
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={toggleFavorite}
            title={isFavorite ? 'Remove from saved' : 'Save equipment'}
          >
            <Heart size={14} fill={isFavorite ? 'var(--color-accent-coral)' : 'none'} color={isFavorite ? 'var(--color-accent-coral)' : 'var(--color-navy)'} />
          </button>
        </div>

        <div className="card-body-content">
          <div className="card-title-group">
            <h3 className="equipment-title-text" title={title}>{title}</h3>
          </div>

          <div className="equipment-location-row">
            <MapPin size={11} className="text-muted" />
            <span className="location-text">{location}</span>
          </div>
        </div>

      </Link>

      <div className="card-action-footer">
        <div className="price-tag-badge">
          <span className="price-currency">₹</span>
          <span className="price-amount">{pricePerDay}</span>
          <span className="price-unit">/day</span>
        </div>

        {isAvailable ? (
          <button
            type="button"
            className="btn btn-primary btn-sm borrow-action-btn"
            onClick={(e) => {
              e.preventDefault();
              if (onBorrowClick) {
                onBorrowClick(equipment);
              }
            }}
          >
            Borrow
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline btn-sm borrow-action-btn disabled"
            disabled
          >
            Rented
          </button>
        )}
      </div>

    </div>
  );
};
