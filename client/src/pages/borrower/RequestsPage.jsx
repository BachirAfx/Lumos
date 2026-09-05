import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRequests } from '../../services/api';
import { RequestCard } from '../../components/common';
import {
  MessageSquarePlus,
  Filter,
  PlusCircle,
  AlertCircle,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';
import './RequestsPage.css';

export const RequestsPage = () => {
  const [requestsList, setRequestsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const filters = {
          urgency: selectedUrgency !== 'all' ? selectedUrgency : undefined
        };
        const response = await getAllRequests(filters);
        if (response.success) {
          let list = response.data;
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            list = list.filter(item =>
              item.title.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query) ||
              item.requesterName.toLowerCase().includes(query)
            );
          }
          setRequestsList(list);
        }
      } catch (err) {
        console.error('Failed to load requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [selectedUrgency, searchQuery]);

  return (
    <div className="requests-page-wrapper">
      <div className="container">

        {/* Page Banner Header */}
        <div className="requests-hero-card card-brutal">
          <div className="requests-hero-content">
            <div className="requests-badge">
              <Sparkles size={14} />
              <span>Campus Community Need Board</span>
            </div>
            <h1 className="requests-hero-title font-display">
              Can&apos;t find gear? Let the campus help.
            </h1>
            <p className="requests-hero-sub">
              Post what equipment you need for class projects, thesis research, or weekend trips. Other students will respond with their gear.
            </p>
            <div className="requests-hero-actions">
              <Link to="/request-equipment" className="btn btn-yellow">
                <PlusCircle size={16} />
                <span>Post a New Request</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="requests-controls-bar card">
          <div className="controls-left">
            <div className="search-box-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search requests by gear name, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="requests-search-input"
              />
            </div>
          </div>

          <div className="controls-right">
            <span className="urgency-filter-label font-semibold text-xs">Urgency:</span>
            <div className="urgency-pills-group">
              <button
                type="button"
                className={`urgency-pill ${selectedUrgency === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedUrgency('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`urgency-pill ${selectedUrgency === 'high' ? 'active high' : ''}`}
                onClick={() => setSelectedUrgency('high')}
              >
                Urgent Only
              </button>
              <button
                type="button"
                className={`urgency-pill ${selectedUrgency === 'medium' ? 'active' : ''}`}
                onClick={() => setSelectedUrgency('medium')}
              >
                Moderate
              </button>
            </div>
          </div>
        </div>

        {/* Requests Count */}
        <div className="results-count-row">
          <span className="results-count-text">
            <strong>{requestsList.length}</strong> active community request{requestsList.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Requests Grid */}
        {loading ? (
          <div className="requests-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="skeleton-request-card card">
                <div className="skeleton-line" style={{ width: '30%' }}></div>
                <div className="skeleton-line" style={{ width: '80%', height: '24px' }}></div>
                <div className="skeleton-line" style={{ width: '100%' }}></div>
              </div>
            ))}
          </div>
        ) : requestsList.length > 0 ? (
          <div className="requests-grid">
            {requestsList.map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        ) : (
          <div className="empty-requests-card card card-brutal">
            <MessageSquarePlus size={44} className="text-muted" />
            <h3 className="font-bold text-lg">No requests found matching your filter</h3>
            <p className="text-sm text-secondary">
              Be the first to post what you need, or broaden your search criteria!
            </p>
            <Link to="/request-equipment" className="btn btn-yellow" style={{ marginTop: '12px' }}>
              Post a Request
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
