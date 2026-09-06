import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createRequest } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
  ArrowLeft,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Plus,
  X,
  Tag,
  HelpCircle
} from 'lucide-react';
import './RequestEquipmentPage.css';

export const RequestEquipmentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'electronics',
    urgency: 'medium',
    startDate: new Date().toISOString().split('T')[0],
    endDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 3);
      return d.toISOString().split('T')[0];
    })(),
    primaryUse: 'Course Project / Capstone',
    budgetPerDay: '350',
    requiredDuration: '3 Days (Weekend)',
    location: 'North Campus Library, Ground Floor',
    preferredTime: 'Weekdays (4:00 PM - 8:00 PM)',
    description: ''
  });

  const [requirements, setRequirements] = useState([
    'Must include battery charger & cable',
    'Protective carrying bag preferred',
    'Willing to provide refundable security deposit'
  ]);
  const [newRequirement, setNewRequirement] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (idx) => {
    setRequirements(requirements.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please provide an equipment name or model needed.');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please provide a brief description of what you need the gear for.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createRequest({
        title: formData.title,
        category: formData.category,
        urgency: formData.urgency,
        startDate: formData.startDate,
        endDate: formData.endDate,
        primaryUse: formData.primaryUse,
        budgetPerDay: Number(formData.budgetPerDay),
        requiredDuration: formData.requiredDuration,
        description: formData.description,
        location: formData.location,
        preferredTime: formData.preferredTime,
        requirements: requirements
      });

      if (response.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/requests');
        }, 1500);
      } else {
        setError(response.error || 'Failed to submit gear request');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="request-equipment-page">
      <div className="request-equipment-container">

        <Link to="/requests" className="req-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Need Board</span>
        </Link>

        <div className="req-page-header">
          <div className="req-header-badge">
            <Sparkles size={13} />
            <span>Community Need Board</span>
          </div>
          <h1 className="req-page-title">Post a Gear Request</h1>
          <p className="req-page-subtitle">
            Can&apos;t find the equipment you need listed? Broadcast your gear requirement to fellow students, researchers, and campus faculty.
          </p>
        </div>

        {error && (
          <div className="req-alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="req-success-box">
            <div className="req-success-icon-circle">
              <CheckCircle2 size={48} color="#FFFFFF" />
            </div>
            <h2 className="req-success-title">Gear Request Broadcasted!</h2>
            <p className="req-success-desc">
              Your request is now active on the Campus Need Board. You&apos;ll be notified as soon as a student or lab offers their equipment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="req-form-stack">

            <div className="req-card-section">
              <div className="req-section-header">
                <div>
                  <h2 className="req-section-title">Equipment & Timeframe</h2>
                  <p className="req-section-sub">Specify what equipment you need and when you need it.</p>
                </div>
                <span className="req-section-pill">Step 1 of 4</span>
              </div>

              <div className="req-form-group">
                <label className="req-label">
                  What equipment are you looking for? <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g., Sony FX3 Cinema Camera Body, TI-Nspire CX II, 100MHz Digital Oscilloscope"
                  value={formData.title}
                  onChange={handleChange}
                  className="req-input"
                />
                <span className="req-input-hint">Be specific with make, model, or minimum technical specifications required.</span>
              </div>

              <div className="req-grid-2">
                <div className="req-form-group">
                  <label className="req-label">Gear Category <span className="req-star">*</span></label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="req-select"
                  >
                    <option value="electronics">Electronics & Media</option>
                    <option value="computing">Computing & Laptops</option>
                    <option value="academics">Calculators & Academics</option>
                    <option value="lab">Lab Equipment & Kits</option>
                    <option value="bicycle">Bicycles & Mobility</option>
                    <option value="miscellaneous">Other Gear</option>
                  </select>
                </div>

                <div className="req-form-group">
                  <label className="req-label">Urgency Level <span className="req-star">*</span></label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="req-select"
                  >
                    <option value="high">Urgent (Needed in &lt; 24 hrs)</option>
                    <option value="medium">Moderate (Needed this week)</option>
                    <option value="low">Flexible (Whenever available)</option>
                  </select>
                </div>
              </div>

              <div className="req-grid-2" style={{ marginTop: '4px' }}>
                <div className="req-form-group">
                  <label className="req-label">Needed From Date <span className="req-star">*</span></label>
                  <div className="req-icon-input-wrap">
                    <Calendar size={16} className="req-input-inner-icon" />
                    <input
                      type="date"
                      name="startDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.startDate}
                      onChange={handleChange}
                      className="req-input with-icon"
                    />
                  </div>
                </div>

                <div className="req-form-group">
                  <label className="req-label">Needed Until Date <span className="req-star">*</span></label>
                  <div className="req-icon-input-wrap">
                    <Calendar size={16} className="req-input-inner-icon" />
                    <input
                      type="date"
                      name="endDate"
                      required
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      value={formData.endDate}
                      onChange={handleChange}
                      className="req-input with-icon"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="req-card-section">
              <div className="req-section-header">
                <div>
                  <h2 className="req-section-title">Intended Use & Project Context</h2>
                  <p className="req-section-sub">Help lenders understand how their equipment will be used and cared for.</p>
                </div>
                <span className="req-section-pill">Step 2 of 4</span>
              </div>

              <div className="req-form-group">
                <label className="req-label">Primary / Intended Use <span className="req-star">*</span></label>
                <select
                  name="primaryUse"
                  value={formData.primaryUse}
                  onChange={handleChange}
                  className="req-select"
                >
                  <option value="Course Project / Capstone">Course Project / Capstone Assignment</option>
                  <option value="Academic Lab Research">Academic Lab Research / Thesis</option>
                  <option value="Media Production / Film Shoot">Media Production / Student Film Shoot</option>
                  <option value="Student Club / Campus Event">Student Club / Campus Event Coverage</option>
                  <option value="Hackathon / Design Competition">Hackathon / Design Competition</option>
                  <option value="Personal Creative Work">Personal Creative Work / Portfolio</option>
                </select>
              </div>

              <div className="req-form-group">
                <label className="req-label">
                  Project Details & Usage Requirements <span className="req-star">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Explain what you are using this gear for (course code, project goals, shoot location, software compatibility, or required accessories)..."
                  value={formData.description}
                  onChange={handleChange}
                  className="req-textarea"
                />
              </div>
            </div>

            <div className="req-card-section">
              <div className="req-section-header">
                <div>
                  <h2 className="req-section-title">Budget & Campus Pickup Spot</h2>
                  <p className="req-section-sub">Set your willing rental rate and preferred on-campus meeting location.</p>
                </div>
                <span className="req-section-pill">Step 3 of 4</span>
              </div>

              <div className="req-grid-2">
                <div className="req-form-group">
                  <label className="req-label">Max Daily Budget <span className="req-star">*</span></label>
                  <div className="req-affix-input-wrap">
                    <span className="req-currency-prefix">₹</span>
                    <input
                      type="number"
                      name="budgetPerDay"
                      min="1"
                      required
                      value={formData.budgetPerDay}
                      onChange={handleChange}
                      className="req-input with-prefix"
                    />
                    <span className="req-affix-suffix">/ day</span>
                  </div>
                </div>

                <div className="req-form-group">
                  <label className="req-label">Required Duration Summary</label>
                  <input
                    type="text"
                    name="requiredDuration"
                    placeholder="e.g. 3 Days (Weekend), 1 Week, 5 Days"
                    value={formData.requiredDuration}
                    onChange={handleChange}
                    className="req-input"
                  />
                </div>
              </div>

              <div className="req-grid-2" style={{ marginTop: '16px' }}>
                <div className="req-form-group">
                  <label className="req-label">Preferred Pickup Spot <span className="req-star">*</span></label>
                  <div className="req-icon-input-wrap">
                    <MapPin size={16} className="req-input-inner-icon" />
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="e.g. North Campus Library, Ground Floor"
                      value={formData.location}
                      onChange={handleChange}
                      className="req-input with-icon"
                    />
                  </div>
                </div>

                <div className="req-form-group">
                  <label className="req-label">Pickup & Handover Window</label>
                  <div className="req-icon-input-wrap">
                    <Clock size={16} className="req-input-inner-icon" />
                    <input
                      type="text"
                      name="preferredTime"
                      placeholder="e.g. Weekdays (4:00 PM - 8:00 PM)"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="req-input with-icon"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="req-card-section">
              <div className="req-section-header">
                <div>
                  <h2 className="req-section-title">Specific Requirements & Campus Trust</h2>
                  <p className="req-section-sub">Add any specific cables, battery conditions, or notes for lenders.</p>
                </div>
                <span className="req-section-pill">Step 4 of 4</span>
              </div>

              <div className="req-form-group">
                <label className="req-label">Specific Inclusions / Conditions Needed</label>
                <div className="req-chip-entry-row">
                  <input
                    type="text"
                    placeholder="e.g., Must include SD card, Extra battery required, Tripod mount..."
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddRequirement();
                      }
                    }}
                    className="req-input"
                  />
                  <button
                    type="button"
                    className="req-chip-btn"
                    onClick={handleAddRequirement}
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>

                <div className="req-chips-list-wrap">
                  {requirements.map((req, idx) => (
                    <div key={idx} className="req-stationery-chip">
                      <span>{req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(idx)}
                        className="req-chip-del-btn"
                        aria-label="Remove requirement"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="req-trust-callout-box">
                <div className="req-trust-icon-circle">
                  <ShieldCheck size={20} color="#172044" />
                </div>
                <div className="req-trust-text">
                  <h4 className="req-trust-title">Campus Community Trust Protocol</h4>
                  <p className="req-trust-desc">
                    All equipment requests are peer-verified with student IDs. Lenders and borrowers are covered under the university honor code and standard equipment deposit protections.
                  </p>
                </div>
              </div>

            </div>

            <div className="req-form-footer">
              <button
                type="button"
                className="req-draft-btn"
                onClick={() => navigate('/requests')}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="req-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'BROADCASTING REQUEST...' : 'BROADCAST GEAR REQUEST'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
