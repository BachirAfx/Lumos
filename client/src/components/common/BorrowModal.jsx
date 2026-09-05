import { useState } from 'react';
import { X, Calendar, DollarSign, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { createRental } from '../../services/api';
import './BorrowModal.css';

export const BorrowModal = ({ equipment, isOpen, onClose, onSuccess }) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !equipment) return null;

  // Calculate duration and prices
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(0, end - start);
  const durationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const rentalTotal = durationDays * equipment.pricePerDay;
  const serviceFee = 40;
  const totalAmount = rentalTotal + serviceFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await createRental({
        equipmentId: equipment.id,
        startDate,
        endDate,
        message
      });

      if (response.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          if (onSuccess) onSuccess(response.data);
          onClose();
        }, 1800);
      } else {
        setError(response.error || 'Failed to submit rental request');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container card-brutal" onClick={(e) => e.stopPropagation()}>

        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title font-display">Confirm Gear Rental</h2>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="modal-success-view">
            <div className="success-icon-circle">
              <Check size={36} color="#FFFFFF" />
            </div>
            <h3 className="text-xl font-bold">Rental Request Sent!</h3>
            <p className="text-sm text-secondary">
              <strong>{equipment.ownerName}</strong> has been notified and will coordinate pickup with you at <strong>{equipment.location}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">

            {/* Equipment Summary Banner */}
            <div className="modal-equipment-summary">
              <img src={equipment.images[0]} alt={equipment.title} className="modal-equipment-thumb" />
              <div className="modal-equipment-details">
                <h4 className="font-bold text-sm">{equipment.title}</h4>
                <p className="text-xs text-muted">Lender: {equipment.ownerName} ({equipment.ownerDepartment})</p>
                <div className="modal-pickup-location text-xs">
                  <span>Pickup: {equipment.location}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="modal-error-alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Date Pickers */}
            <div className="date-pickers-row">
              <div className="form-field">
                <label className="field-label">Pickup Date</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="field-icon" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="modal-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">Return Date</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="field-icon" />
                  <input
                    type="date"
                    required
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="modal-input"
                  />
                </div>
              </div>
            </div>

            {/* Note to Lender */}
            <div className="form-field">
              <label className="field-label">Note for {equipment.ownerName} (Optional)</label>
              <textarea
                placeholder="Let the lender know what you'll be using the gear for, preferred pickup time, etc."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="modal-textarea"
              />
            </div>

            {/* Price Breakdown Breakdown */}
            <div className="price-breakdown-card">
              <div className="breakdown-row">
                <span>₹{equipment.pricePerDay} × {durationDays} day{durationDays > 1 ? 's' : ''}</span>
                <span>₹{rentalTotal.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span>Campus Trust & Safety Fee</span>
                <span>₹{serviceFee.toFixed(2)}</span>
              </div>
              <div className="breakdown-row deposit-note">
                <span>Refundable Security Deposit (Held only)</span>
                <span>₹{equipment.deposit.toFixed(2)}</span>
              </div>
              <div className="breakdown-divider"></div>
              <div className="breakdown-row total-row">
                <span className="font-bold">Total Due at Checkout</span>
                <span className="total-price font-display">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Guarantee Note */}
            <div className="guarantee-note-box">
              <ShieldCheck size={18} className="text-primary-color flex-shrink-0" />
              <p className="text-xs text-secondary">
                Protected by Rovo Campus Guarantee. Full refund if item condition doesn't match description.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="modal-actions-footer">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-yellow"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Request...' : `Request for ₹${totalAmount.toFixed(2)}`}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
