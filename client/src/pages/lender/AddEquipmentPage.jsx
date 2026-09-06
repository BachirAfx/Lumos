import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createEquipment } from '../../services/api';
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  MapPin,
  Clock,
  Trash2
} from 'lucide-react';
import './AddEquipmentPage.css';

export const AddEquipmentPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    pricePerDay: '',
    pricePerHour: '',
    deposit: '',
    minDuration: '',
    location: '',
    description: '',
    availableDates: ''
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [accessories, setAccessories] = useState([]);
  const [newAccessory, setNewAccessory] = useState('');

  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAccessory = () => {
    if (newAccessory.trim() && !accessories.includes(newAccessory.trim())) {
      setAccessories([...accessories, newAccessory.trim()]);
      setNewAccessory('');
    }
  };

  const handleRemoveAccessory = (idx) => {
    setAccessories(accessories.filter((_, i) => i !== idx));
  };

  const handleAddRule = () => {
    if (newRule.trim() && !rules.includes(newRule.trim())) {
      setRules([...rules, newRule.trim()]);
      setNewRule('');
    }
  };

  const handleRemoveRule = (idx) => {
    setRules(rules.filter((_, i) => i !== idx));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = 4 - images.length;
    const filesToAdd = remainingSlots > 0 ? files.slice(0, remainingSlots) : [];
    if (filesToAdd.length === 0) return;

    const newPreviewUrls = filesToAdd.map(file => URL.createObjectURL(file));

    setImages(prev => [...prev, ...newPreviewUrls].slice(0, 4));
    setImageFiles(prev => [...prev, ...filesToAdd].slice(0, 4));

    e.target.value = '';
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please provide an equipment name.');
      return;
    }

    if (!formData.category) {
      setError('Please select a category.');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please provide a brief description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createEquipment({
        title: formData.title,
        category: formData.category,
        condition: formData.condition,
        pricePerDay: Number(formData.pricePerDay),
        pricePerHour: formData.pricePerHour ? Number(formData.pricePerHour) : 0,
        deposit: Number(formData.deposit),
        location: formData.location,
        description: formData.description,
        availableDates: formData.availableDates,
        images: images,
        features: accessories,
        rules: rules,
        tags: formData.category ? [formData.category, 'Student Gear'] : ['Student Gear']
      });

      if (response.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/lender');
        }, 1500);
      } else {
        setError(response.error || 'Failed to list equipment');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-equipment-page">
      <div className="add-equipment-container">

        <Link to="/lender" className="add-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="add-page-header">
          <h1 className="add-page-title">List New Equipment</h1>
          <p className="add-page-subtitle">
            Provide accurate details to help students find and rent your gear safely on campus.
          </p>
        </div>

        {error && (
          <div className="add-alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="add-success-box">
            <div className="add-success-icon-circle">
              <CheckCircle2 size={48} color="#FFFFFF" />
            </div>
            <h2 className="add-success-title">Equipment Listed Successfully!</h2>
            <p className="add-success-desc">
              Your gear is now visible on the campus discovery catalog. You&apos;ll be notified when someone requests to borrow it.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="add-form-stack">

            <div className="add-card-section">
              <div className="add-section-header">
                <h2 className="add-section-title">Basic Details</h2>
                <span className="add-section-pill">Step 1 of 4</span>
              </div>

              <div className="add-form-group">
                <label className="add-label">Item Name / Model <span className="req-star">*</span></label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g., Sony FX3 Cinema Camera Body + 24-70mm GM Lens"
                  value={formData.title}
                  onChange={handleChange}
                  className="add-input"
                />
              </div>

              <div className="add-grid-2">
                <div className="add-form-group">
                  <label className="add-label">Category <span className="req-star">*</span></label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="add-select"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="electronics">Electronics & Cameras</option>
                    <option value="computing">Computing & Laptops</option>
                    <option value="academics">Calculators & Academics</option>
                    <option value="lab">Lab Equipment & Kits</option>
                    <option value="bicycle">Bicycles & Mobility</option>
                    <option value="miscellaneous">Other Gear</option>
                  </select>
                </div>

                <div className="add-form-group">
                  <label className="add-label">Item Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="add-select"
                  >
                    <option value="" disabled>Select condition</option>
                    <option value="Brand New">Brand New / Mint</option>
                    <option value="Excellent">Excellent Condition</option>
                    <option value="Good">Good (Minor Wear)</option>
                    <option value="Fair">Fair / Usable</option>
                  </select>
                </div>
              </div>

              <div className="add-form-group">
                <label className="add-label">Description & Usage Guidelines <span className="req-star">*</span></label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe the condition, key technical specs, included accessories, and any care notes for borrowers..."
                  value={formData.description}
                  onChange={handleChange}
                  className="add-textarea"
                />
              </div>
            </div>

            <div className="add-card-section">
              <div className="add-section-header">
                <div>
                  <h2 className="add-section-title">Upload Photos</h2>
                  <p className="add-section-sub">Add up to 4 clear photos of your equipment. First photo is used as cover.</p>
                </div>
                <span className="add-section-pill">Step 2 of 4</span>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
              />

              <div className="add-dropzone-box" onClick={handleTriggerFileInput}>
                <div className="dropzone-inner">
                  <div className="dropzone-icon-circle">
                    <UploadCloud size={24} color="#172044" />
                  </div>
                  <p className="dropzone-main-text">
                    <strong>Click to upload</strong> or drag and drop photos
                  </p>
                  <p className="dropzone-sub-text">PNG, JPG, WEBP up to 10MB each</p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="add-photos-grid">
                  {images.map((imgUrl, idx) => (
                    <div key={idx} className="photo-preview-item">
                      <img src={imgUrl} alt={`Upload preview ${idx + 1}`} className="preview-thumb-img" />
                      {idx === 0 && <span className="cover-photo-badge">Cover</span>}
                      <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={() => handleRemoveImage(idx)}
                        title="Remove photo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {images.length < 4 && (
                    <button
                      type="button"
                      className="add-more-photo-box"
                      onClick={handleTriggerFileInput}
                    >
                      <Plus size={20} />
                      <span>Add Photo</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="add-card-section">
              <div className="add-section-header">
                <h2 className="add-section-title">Pricing & Location</h2>
                <span className="add-section-pill">Step 3 of 4</span>
              </div>

              <div className="add-grid-3">
                <div className="add-form-group">
                  <label className="add-label">Daily Rental Rate <span className="req-star">*</span></label>
                  <div className="add-affix-input-wrap">
                    <span className="add-currency-prefix">₹</span>
                    <input
                      type="number"
                      name="pricePerDay"
                      min="1"
                      required
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      className="add-input with-prefix"
                    />
                    <span className="add-affix-suffix">/ day</span>
                  </div>
                </div>

                <div className="add-form-group">
                  <label className="add-label">Hourly Rate (Optional)</label>
                  <div className="add-affix-input-wrap">
                    <span className="add-currency-prefix">₹</span>
                    <input
                      type="number"
                      name="pricePerHour"
                      min="0"
                      value={formData.pricePerHour}
                      onChange={handleChange}
                      className="add-input with-prefix"
                    />
                    <span className="add-affix-suffix">/ hr</span>
                  </div>
                </div>

                <div className="add-form-group">
                  <label className="add-label">Refundable Deposit <span className="req-star">*</span></label>
                  <div className="add-affix-input-wrap">
                    <span className="add-currency-prefix">₹</span>
                    <input
                      type="number"
                      name="deposit"
                      min="0"
                      required
                      value={formData.deposit}
                      onChange={handleChange}
                      className="add-input with-prefix"
                    />
                  </div>
                </div>
              </div>

              <div className="add-grid-2">
                <div className="add-form-group">
                  <label className="add-label">Campus Pickup & Return Spot <span className="req-star">*</span></label>
                  <div className="add-icon-input-wrap">
                    <MapPin size={16} className="input-inner-icon" />
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="e.g., Engineering Block C, Ground Floor"
                      value={formData.location}
                      onChange={handleChange}
                      className="add-input with-icon"
                    />
                  </div>
                </div>

                <div className="add-form-group">
                  <label className="add-label">Available Time Window</label>
                  <div className="add-icon-input-wrap">
                    <Clock size={16} className="input-inner-icon" />
                    <input
                      type="text"
                      name="availableDates"
                      placeholder="e.g., Daily (9:00 AM - 8:00 PM)"
                      value={formData.availableDates}
                      onChange={handleChange}
                      className="add-input with-icon"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="add-card-section">
              <div className="add-section-header">
                <h2 className="add-section-title">Included Accessories & Rules</h2>
                <span className="add-section-pill">Step 4 of 4</span>
              </div>

              <div className="add-form-group">
                <label className="add-label">Included Accessories & Cables</label>
                <div className="add-chip-entry-row">
                  <input
                    type="text"
                    placeholder="e.g., HDMI Cable, Extra Battery, Lens Hood..."
                    value={newAccessory}
                    onChange={(e) => setNewAccessory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddAccessory();
                      }
                    }}
                    className="add-input"
                  />
                  <button
                    type="button"
                    className="add-chip-btn"
                    onClick={handleAddAccessory}
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>

                <div className="chips-list-wrap">
                  {accessories.map((item, idx) => (
                    <div key={idx} className="stationery-chip">
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAccessory(idx)}
                        className="chip-del-btn"
                        aria-label="Remove item"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="add-form-group" style={{ marginTop: '16px' }}>
                <label className="add-label">Usage Rules & Student Requirements</label>
                <div className="add-chip-entry-row">
                  <input
                    type="text"
                    placeholder="e.g., Return on time, no food/drinks nearby..."
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddRule();
                      }
                    }}
                    className="add-input"
                  />
                  <button
                    type="button"
                    className="add-chip-btn"
                    onClick={handleAddRule}
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>

                <div className="chips-list-wrap">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="stationery-chip rule-chip">
                      <span>{rule}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRule(idx)}
                        className="chip-del-btn"
                        aria-label="Remove rule"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="add-form-footer">
              <button
                type="button"
                className="add-draft-btn"
                onClick={() => navigate('/lender')}
                disabled={isSubmitting}
              >
                Save as Draft
              </button>

              <button
                type="submit"
                className="add-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing Gear...' : 'LIST EQUIPMENT'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
