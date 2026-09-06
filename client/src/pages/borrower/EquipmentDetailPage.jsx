import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { getEquipmentById, createRental } from '../../services/api';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MapPin,
  ChevronRight,
  Printer,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import './EquipmentDetailPage.css';

export const EquipmentDetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const [isRequestOpen, setIsRequestOpen] = useState(searchParams.get('state') === 'request');
  const [isRecordsOpen, setIsRecordsOpen] = useState(searchParams.get('state') === 'records');

  const [startDate, setStartDate] = useState('11 Sept');
  const [endDate, setEndDate] = useState('14 Sept');
  const [primaryUse, setPrimaryUse] = useState('');
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [chatFeedback, setChatFeedback] = useState(false);

  const requestPopoverRef = useRef(null);
  const recordsPopoverRef = useRef(null);
  const requestBtnRef = useRef(null);
  const recordsBtnRef = useRef(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      try {
        const response = await getEquipmentById(id);
        if (response.success) {
          setEquipment(response.data);
        } else {
          setEquipment(null);
        }
      } catch (err) {
        console.error('Failed to load equipment:', err);
        setEquipment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isRequestOpen &&
        requestPopoverRef.current &&
        !requestPopoverRef.current.contains(event.target) &&
        requestBtnRef.current &&
        !requestBtnRef.current.contains(event.target)
      ) {
        setIsRequestOpen(false);
      }

      if (
        isRecordsOpen &&
        recordsPopoverRef.current &&
        !recordsPopoverRef.current.contains(event.target) &&
        recordsBtnRef.current &&
        !recordsBtnRef.current.contains(event.target)
      ) {
        setIsRecordsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isRequestOpen, isRecordsOpen]);

  if (loading) {
    return (
      <div className="equipment-detail-page">
        <div className="equipment-detail-container">
          <div className="detail-loading-state">
            <div className="loading-spinner"></div>
            <p>Loading equipment details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="equipment-detail-page">
        <div className="equipment-detail-container not-found-state">
          <div className="not-found-card">
            <AlertCircle size={48} className="not-found-icon" />
            <h2>Equipment Not Found</h2>
            <p>The requested equipment listing could not be located or may have been removed.</p>
            <button
              type="button"
              className="btn-back-explore"
              onClick={() => navigate('/explore')}
            >
              Browse Available Gear
            </button>
          </div>
        </div>
      </div>
    );
  }

  const defaultImages = [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1589872782736-a36c8be5748a?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80'
  ];

  const galleryImages = equipment.images && equipment.images.length > 0
    ? [
        ...equipment.images,
        ...defaultImages.slice(equipment.images.length)
      ].slice(0, 4)
    : defaultImages;

  const currentImage = galleryImages[selectedImageIndex] || galleryImages[0];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const pricePerDay = equipment.pricePerDay || 150;
  const approxDays = 3;
  const approxCharge = pricePerDay * approxDays;

  const recordsData = [
    {
      id: 'rec-1',
      dateBadge: 'Sept 13, 2026',
      usedFrom: 'Sept 13 - Sept 15',
      usedFor: 'XYZ'
    },
    {
      id: 'rec-2',
      dateBadge: 'Sept 13, 2026',
      usedFrom: 'Sept 13 - Sept 15',
      usedFor: 'XYZ'
    },
    {
      id: 'rec-3',
      dateBadge: 'Sept 13, 2026',
      usedFrom: 'Sept 13 - Sept 15',
      usedFor: 'XYZ'
    }
  ];

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setRequestSubmitting(true);

    try {
      await createRental({
        equipmentId: equipment.id,
        startDate: '2026-09-11',
        endDate: '2026-09-14',
        message: primaryUse || 'Primary academic/project use'
      });
      setRequestSuccess(true);
      setTimeout(() => {
        setIsRequestOpen(false);
        setRequestSuccess(false);
      }, 1500);
    } catch (err) {
      console.error('Request failed:', err);
    } finally {
      setRequestSubmitting(false);
    }
  };

  const handleChatClick = () => {
    setChatFeedback(true);
    setTimeout(() => setChatFeedback(false), 2500);
  };

  const handlePrintRecords = () => {
    const printWindow = document.createElement('iframe');
    printWindow.style.position = 'absolute';
    printWindow.style.top = '-9999px';
    printWindow.style.left = '-9999px';
    printWindow.style.width = '0px';
    printWindow.style.height = '0px';
    printWindow.style.border = 'none';
    document.body.appendChild(printWindow);

    const doc = printWindow.contentWindow.document;
    const printDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const rowsHtml = recordsData.map((rec, index) => `
      <tr>
        <td style="padding: 12px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #F1F5F9;">
          <span style="display: inline-block; background-color: #D1FAE5; color: #065F46; border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 600;">
            ${rec.dateBadge}
          </span>
        </td>
        <td style="padding: 12px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #F1F5F9; font-weight: 500;">
          ${rec.usedFrom}
        </td>
        <td style="padding: 12px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #F1F5F9;">
          ${rec.usedFor}
        </td>
      </tr>
    `).join('');

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Usage Records - ${equipment.title || 'Equipment'}</title>
        <meta charset="utf-8" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #172044;
            background: #ffffff;
            padding: 36px 44px;
            line-height: 1.5;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #E2E8F0;
            padding-bottom: 20px;
            margin-bottom: 24px;
          }
          .brand-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #172044;
            letter-spacing: -0.3px;
          }
          .brand-subtitle {
            font-size: 13px;
            color: #64748B;
            margin-top: 3px;
          }
          .meta-info {
            text-align: right;
          }
          .badge {
            display: inline-block;
            background-color: #EEF2FF;
            color: #4F46E5;
            font-weight: 600;
            font-size: 11px;
            padding: 4px 12px;
            border-radius: 999px;
            margin-bottom: 6px;
          }
          .meta-date {
            font-size: 12px;
            color: #64748B;
          }
          .summary-card {
            background-color: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            padding: 18px 20px;
            margin-bottom: 28px;
          }
          .summary-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 17px;
            font-weight: 700;
            color: #0F172A;
            margin-bottom: 12px;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          .summary-col {
            display: flex;
            flex-direction: column;
          }
          .summary-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #64748B;
            font-weight: 600;
            margin-bottom: 2px;
          }
          .summary-val {
            font-size: 13px;
            font-weight: 600;
            color: #1E293B;
          }
          .section-heading {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: #172044;
            margin-bottom: 12px;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 32px;
          }
          th {
            background-color: #F1F5F9;
            color: #475569;
            font-size: 12px;
            font-weight: 600;
            text-align: left;
            padding: 12px 16px;
            border-bottom: 1px solid #E2E8F0;
          }
          tr:last-child td {
            border-bottom: none;
          }
          .footer {
            border-top: 1px solid #E2E8F0;
            padding-top: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            color: #94A3B8;
          }
          @media print {
            body {
              padding: 10mm 15mm;
            }
            @page {
              margin: 10mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="brand-title">Rovo Campus Gear Share</h1>
            <p class="brand-subtitle">Official Equipment Rental & Usage History</p>
          </div>
          <div class="meta-info">
            <span class="badge">Verified Records Log</span>
            <p class="meta-date">Generated on ${printDate}</p>
          </div>
        </div>

        <div class="summary-card">
          <h2 class="summary-title">${equipment.title || 'Equipment Details'}</h2>
          <div class="summary-grid">
            <div class="summary-col">
              <span class="summary-label">Owner</span>
              <span class="summary-val">${equipment.ownerName || 'Verified Student'}</span>
            </div>
            <div class="summary-col">
              <span class="summary-label">Location</span>
              <span class="summary-val">${equipment.location || 'Campus'}</span>
            </div>
            <div class="summary-col">
              <span class="summary-label">Condition</span>
              <span class="summary-val">${equipment.condition || 'Excellent'}</span>
            </div>
            <div class="summary-col">
              <span class="summary-label">Daily Rate</span>
              <span class="summary-val">₹${equipment.pricePerDay || 150}/day</span>
            </div>
          </div>
        </div>

        <h3 class="section-heading">Past Borrowing & Usage History</h3>
        <table>
          <thead>
            <tr>
              <th>Recorded Date</th>
              <th>Rental Period</th>
              <th>Primary Purpose / Project</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="footer">
          <span>Rovo Student Equipment Sharing Network</span>
          <span>Confidential Campus Record • Page 1 of 1</span>
        </div>
      </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      printWindow.contentWindow.focus();
      printWindow.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(printWindow);
      }, 1000);
    }, 250);
  };

  return (
    <div className="equipment-detail-page">
      <div className="equipment-detail-container">

        <div className="detail-top-grid">

          <div className="detail-gallery-column">

            <div className="main-image-card">
              <div className="main-image-frame">
                <img
                  src={currentImage}
                  alt={equipment.title || 'Equipment Preview'}
                  className="main-preview-img"
                />

                <button
                  type="button"
                  className="image-nav-arrow arrow-prev"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  className="image-nav-arrow arrow-next"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="thumbnails-row-card">
              <div className="thumbnails-grid">
                {galleryImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`thumbnail-slot ${selectedImageIndex === index ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Select view ${index + 1}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="thumbnail-img" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="detail-sidebar-column">

            <div className="sidebar-card card-primary-info">
              <div className="primary-info-top-row">
                <div className="price-display-text">
                  <span className="price-num">₹{pricePerDay}</span>
                  <span className="price-slash">/day</span>
                </div>

                <button
                  type="button"
                  className={`favorite-toggle-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                  title={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    size={22}
                    fill={isFavorite ? '#FF8787' : 'none'}
                    color={isFavorite ? '#FF8787' : '#172044'}
                  />
                </button>
              </div>

              <h1 className="equipment-main-title">{equipment.title || 'Title'}</h1>

              <div className="equipment-meta-location">
                <MapPin size={14} className="location-pin-icon" />
                <span>{equipment.location || 'Location'}</span>
              </div>

              <div className="primary-info-bottom-row">
                <span className="listing-date-text">
                  {equipment.listedDate || '24 August 2026'}
                </span>

                <div className="request-btn-wrapper">
                  <button
                    ref={requestBtnRef}
                    type="button"
                    className="btn-request-borrow"
                    onClick={() => {
                      setIsRequestOpen(!isRequestOpen);
                      setIsRecordsOpen(false);
                    }}
                  >
                    Request to Borrow
                  </button>

                  {isRequestOpen && (
                    <div
                      ref={requestPopoverRef}
                      className="popover-request-box"
                    >
                      {requestSuccess ? (
                        <div className="request-popover-success">
                          <CheckCircle2 size={32} color="#10B981" />
                          <h4>Request Sent!</h4>
                          <p>The lender has been notified.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSendRequest} className="request-popover-form">
                          <h3 className="popover-heading">Needed From</h3>

                          <div className="popover-date-row">
                            <div className="date-pill">
                              <span>{startDate}</span>
                            </div>
                            <span className="date-arrow">→</span>
                            <div className="date-pill">
                              <span>{endDate}</span>
                            </div>
                          </div>

                          <div className="popover-field-group">
                            <label className="popover-field-label">Primary Use</label>
                            <input
                              type="text"
                              className="popover-input"
                              placeholder="Use"
                              value={primaryUse}
                              onChange={(e) => setPrimaryUse(e.target.value)}
                            />
                          </div>

                          <div className="popover-field-group">
                            <label className="popover-field-label">Approx Charge</label>
                            <div className="charge-badge">
                              <span>₹{approxCharge}</span>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn-popover-send"
                            disabled={requestSubmitting}
                          >
                            {requestSubmitting ? 'Sending...' : 'Send Request'}
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sidebar-card card-owner-profile">
              <div className="owner-profile-top-row">
                <div className="owner-avatar-info">
                  <div className="owner-avatar-circle">
                    {equipment.ownerAvatar ? (
                      <img src={equipment.ownerAvatar} alt={equipment.ownerName || 'Arjun'} />
                    ) : (
                      <div className="avatar-placeholder-circle"></div>
                    )}
                  </div>

                  <div className="owner-details-col">
                    <span className="owner-display-name">
                      {equipment.ownerName || 'Arjun'}
                    </span>
                    <span className="owner-listed-pill">
                      {equipment.ownerListedCount || 5} Listed
                    </span>
                  </div>
                </div>

                <Link to="/explore" className="owner-chevron-link" title="View all listings">
                  <ChevronRight size={20} color="#172044" />
                </Link>
              </div>

              <div className="owner-profile-bottom-row">
                <button
                  type="button"
                  className="btn-owner-chat"
                  onClick={handleChatClick}
                >
                  {chatFeedback ? 'Chat Started' : 'Chat'}
                </button>
              </div>
            </div>

            <div
              className="sidebar-card card-have-similar"
              onClick={() => navigate('/lender/add-item')}
              role="button"
              tabIndex={0}
            >
              <span className="have-similar-title">+ Have Similar?</span>
              <span className="have-similar-subtitle">List here</span>
            </div>

            <div className="sidebar-card card-condition-records">
              <div className="condition-badge-frame">
                <span className="condition-text">
                  Condition: {equipment.condition || 'Excellent'}
                </span>
              </div>

              <div className="records-btn-wrapper">
                <button
                  ref={recordsBtnRef}
                  type="button"
                  className="btn-records"
                  onClick={() => {
                    setIsRecordsOpen(!isRecordsOpen);
                    setIsRequestOpen(false);
                  }}
                >
                  Records
                </button>

                {isRecordsOpen && (
                  <div
                    ref={recordsPopoverRef}
                    className="popover-records-box"
                  >
                    <div className="records-popover-header">
                      <h3 className="records-title">Records</h3>
                      <button
                        type="button"
                        className="btn-records-print"
                        onClick={handlePrintRecords}
                        title="Print records"
                      >
                        <Printer size={16} color="#172044" />
                      </button>
                    </div>

                    <div className="records-items-list">
                      {recordsData.map((rec) => (
                        <div key={rec.id} className="record-item-card">
                          <div className="record-date-badge">
                            {rec.dateBadge}
                          </div>
                          <div className="record-details-grid">
                            <div className="record-col">
                              <span className="record-col-label">Used From</span>
                              <span className="record-col-val">
                                <Calendar size={10} className="record-cal-icon" />
                                {rec.usedFrom}
                              </span>
                            </div>
                            <div className="record-col">
                              <span className="record-col-label">Used For</span>
                              <span className="record-col-val">{rec.usedFor}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        <div className="detail-description-card">
          <h2 className="description-card-heading">Description</h2>
          <div className="description-content-frame">
            <p className="description-paragraph">
              {equipment.description ||
                'High-grade campus equipment available for academic projects, research work, student club productions, and coursework. Handled with care and maintained in pristine condition.'}
            </p>

            {equipment.features && equipment.features.length > 0 && (
              <div className="description-features-block">
                <h4 className="features-subheading">Included Features & Accessories</h4>
                <ul className="features-sublist">
                  {equipment.features.map((feature, idx) => (
                    <li key={idx} className="feature-subitem">
                      <CheckCircle2 size={14} className="feature-bullet-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {equipment.rules && equipment.rules.length > 0 && (
              <div className="description-rules-block">
                <h4 className="rules-subheading">Borrower Guidelines & Care Instructions</h4>
                <ul className="rules-sublist">
                  {equipment.rules.map((rule, idx) => (
                    <li key={idx} className="rule-subitem">
                      <span>• {rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
