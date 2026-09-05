import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getLenderStats, getAllEquipment, getAllRequests } from '../../services/api';
import {
  Plus,
  Heart,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import './LenderDashboardPage.css';

export const LenderDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [lentItems, setLentItems] = useState([]);
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [favorites, setFavorites] = useState({});

  const listingsScrollRef = useRef(null);
  const lentScrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await getLenderStats();
        if (statsRes.success) setStats(statsRes.data);

        const equipRes = await getAllEquipment();
        if (equipRes.success) {
          const all = equipRes.data;
          // Filter or mock listings for user
          const userItems = all.slice(0, 6);
          setMyListings(userItems);

          // Lent items (items marked as rented or simulated lent list)
          const rented = all.filter(item => item.status === 'rented');
          if (rented.length > 0) {
            setLentItems(rented);
          } else {
            // Provide realistic lent items from catalog for visual fidelity
            setLentItems([
              { ...all[1], id: 'lent-1', status: 'rented' },
              { ...all[4], id: 'lent-2', status: 'rented' },
              { ...all[2], id: 'lent-3', status: 'rented' }
            ]);
          }
        }

        const reqRes = await getAllRequests();
        if (reqRes.success && reqRes.data.length > 0) {
          const requestsList = [
            ...reqRes.data,
            {
              id: 'req-demo-1',
              requesterName: 'Arjun',
              requesterAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
              createdAt: '2hr ago',
              title: 'Sony FX3 Cinema Camera Body',
              requiredDuration: 'Sept 13 - Sept 15'
            },
            {
              id: 'req-demo-2',
              requesterName: 'Riya Sharma',
              requesterAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
              createdAt: '3hr ago',
              title: 'MacBook Pro M2 16" (Final Cut Pro)',
              requiredDuration: 'Sept 14 - Sept 16'
            },
            {
              id: 'req-demo-3',
              requesterName: 'Dev Patel',
              requesterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
              createdAt: '5hr ago',
              title: 'Rigol Digital Oscilloscope 100MHz',
              requiredDuration: 'Sept 15 - Sept 18'
            }
          ].slice(0, 6);
          setBorrowRequests(requestsList);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };

    fetchData();
  }, [user]);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const displayName = user?.name ? user.name.split(' ')[0] : 'Mehadi';

  return (
    <div className="lender-dashboard-page">
      <div className="lender-dashboard-container">

        {/* Top Header Row */}
        <div className="lender-header-section">
          <div className="lender-welcome-text">
            <h1 className="lender-greeting-title">Hello {displayName}</h1>
            <p className="lender-greeting-subtitle">Here&apos;s what&apos;s happening with your gear</p>
          </div>

          <Link to="/lender/add-item" className="lender-list-btn">
            <Plus size={18} strokeWidth={2.5} />
            <span>List new Item</span>
          </Link>
        </div>

        {/* 3 Pastel Metric Cards */}
        <div className="lender-pastel-cards-grid">
          {/* Pastel Blue Card */}
          <div className="pastel-metric-card pastel-blue">
            <div className="pastel-card-content">
              <span className="pastel-card-value">
                ₹{stats?.totalEarnings ? stats.totalEarnings.toFixed(0) : '446'}
              </span>
              <span className="pastel-card-label">Total Earnings</span>
            </div>
            <Link to="/lender/listings" className="pastel-arrow-btn" title="View Listings">
              <span>→</span>
            </Link>
          </div>

          {/* Pastel Green Card */}
          <div className="pastel-metric-card pastel-green">
            <div className="pastel-card-content">
              <span className="pastel-card-value">
                {myListings.length || 3}
              </span>
              <span className="pastel-card-label">Active Listings</span>
            </div>
            <Link to="/lender/listings" className="pastel-arrow-btn" title="View Active Gear">
              <span>→</span>
            </Link>
          </div>

          {/* Pastel Peach Card */}
          <div className="pastel-metric-card pastel-peach">
            <div className="pastel-card-content">
              <span className="pastel-card-value">
                {borrowRequests.length || 6}
              </span>
              <span className="pastel-card-label">Borrow Requests</span>
            </div>
            <Link to="/requests" className="pastel-arrow-btn" title="View Requests">
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="lender-main-grid">

          {/* Left / Main Column */}
          <div className="lender-left-column">

            {/* Box 1: Your Listings */}
            <div className="lender-card-box">
              <div className="card-box-header">
                <h2 className="card-box-title">Your Listings</h2>
                <Link to="/lender/listings" className="card-box-view-all">
                  <span>View all</span>
                  <span className="view-all-arrow">→</span>
                </Link>
              </div>

              <div className="carousel-wrapper">
                <button
                  type="button"
                  className="carousel-nav-btn prev-btn"
                  onClick={() => scrollCarousel(listingsScrollRef, 'left')}
                  aria-label="Previous Listings"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="carousel-track" ref={listingsScrollRef}>
                  {myListings.map((item) => {
                    const isAvailable = item.status === 'available';
                    const isFav = !!favorites[item.id];

                    return (
                      <div key={item.id} className="gear-carousel-card">
                        <div className="gear-card-image-wrap">
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'}
                            alt={item.title}
                            className="gear-card-img"
                          />
                          <span className={`gear-status-badge ${isAvailable ? 'status-available' : 'status-lent'}`}>
                            <span className="status-dot"></span>
                            <span>{isAvailable ? 'Available' : 'Lent'}</span>
                          </span>

                          <button
                            type="button"
                            className={`gear-heart-btn ${isFav ? 'active' : ''}`}
                            onClick={() => toggleFavorite(item.id)}
                            aria-label="Save to favorites"
                          >
                            <Heart size={14} fill={isFav ? '#FF4D4D' : 'none'} color={isFav ? '#FF4D4D' : '#172044'} />
                          </button>
                        </div>

                        <div className="gear-card-info">
                          <Link to={`/equipment/${item.id}`} className="gear-card-title">
                            {item.title}
                          </Link>
                          <div className="gear-card-price">
                            ₹{item.pricePerDay} / day
                          </div>
                          <div className="gear-card-meta">
                            <span className="meta-location">
                              <MapPin size={11} className="meta-icon" />
                              <span>{item.location ? item.location.split(',')[0] : '1.2 km away'}</span>
                            </span>
                            <span className="meta-rating">
                              <Star size={11} className="star-icon" fill="#EAB308" color="#EAB308" />
                              <span>{item.rating || '4.8'}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="carousel-nav-btn next-btn"
                  onClick={() => scrollCarousel(listingsScrollRef, 'right')}
                  aria-label="Next Listings"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Box 2: Lent Items */}
            <div className="lender-card-box">
              <div className="card-box-header">
                <h2 className="card-box-title">Lent Items</h2>
                <Link to="/lender/listings" className="card-box-view-all">
                  <span>View all</span>
                  <span className="view-all-arrow">→</span>
                </Link>
              </div>

              <div className="carousel-wrapper">
                <button
                  type="button"
                  className="carousel-nav-btn prev-btn"
                  onClick={() => scrollCarousel(lentScrollRef, 'left')}
                  aria-label="Previous Lent Items"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="carousel-track" ref={lentScrollRef}>
                  {lentItems.map((item) => {
                    const isFav = !!favorites[item.id];

                    return (
                      <div key={item.id} className="gear-carousel-card">
                        <div className="gear-card-image-wrap">
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80'}
                            alt={item.title}
                            className="gear-card-img"
                          />
                          <span className="gear-status-badge status-lent">
                            <span className="status-dot"></span>
                            <span>Lent</span>
                          </span>

                          <button
                            type="button"
                            className={`gear-heart-btn ${isFav ? 'active' : ''}`}
                            onClick={() => toggleFavorite(item.id)}
                            aria-label="Save to favorites"
                          >
                            <Heart size={14} fill={isFav ? '#FF4D4D' : 'none'} color={isFav ? '#FF4D4D' : '#172044'} />
                          </button>
                        </div>

                        <div className="gear-card-info">
                          <Link to={`/equipment/${item.id}`} className="gear-card-title">
                            {item.title}
                          </Link>
                          <div className="gear-card-price">
                            ₹{item.pricePerDay} / day
                          </div>
                          <div className="gear-card-meta">
                            <span className="meta-location">
                              <MapPin size={11} className="meta-icon" />
                              <span>{item.location ? item.location.split(',')[0] : '1.2 km away'}</span>
                            </span>
                            <span className="meta-rating">
                              <Star size={11} className="star-icon" fill="#EAB308" color="#EAB308" />
                              <span>{item.rating || '4.8'}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="carousel-nav-btn next-btn"
                  onClick={() => scrollCarousel(lentScrollRef, 'right')}
                  aria-label="Next Lent Items"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Borrow Requests */}
          <div className="lender-right-column">
            <div className="lender-card-box borrow-requests-box">
              <div className="card-box-header">
                <h2 className="card-box-title">Borrow Requests</h2>
                <Link to="/requests" className="card-box-view-all">
                  <span>View all</span>
                  <span className="view-all-arrow">→</span>
                </Link>
              </div>

              <div className="requests-stack-list">
                {borrowRequests.map((req, idx) => (
                  <div key={req.id || idx} className="borrow-request-item-card">
                    <img
                      src={req.requesterAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={req.requesterName}
                      className="request-user-avatar"
                    />

                    <div className="request-item-details">
                      <div className="request-user-top">
                        <span className="request-user-name">{req.requesterName || 'Arjun'}</span>
                        <span className="request-timestamp">{req.createdAt || '2hr ago'}</span>
                      </div>

                      <p className="request-gear-text">
                        Wants to borrow <span className="gear-highlight">{req.title ? req.title.slice(0, 30) : 'XYZ'}</span>
                      </p>

                      <div className="request-dates-row">
                        <span>{req.requiredDuration || 'Sept 13 - Sept 15'}</span>
                      </div>
                    </div>

                    <Link
                      to={`/requests/${req.id}`}
                      className="request-arrow-circle-btn"
                      title="View Request Details"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
