import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getAllEquipment } from '../../services/api';
import {
  Package,
  PlusCircle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  DollarSign,
  MapPin,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import './LenderListingsPage.css';

export const LenderListingsPage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await getAllEquipment({ ownerId: user?.id });
        if (response.success) {
          setListings(response.data);
        }
      } catch (err) {
        console.error('Failed to load listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user]);

  const handleToggleAvailability = (itemId) => {
    setListings(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          status: item.status === 'available' ? 'unavailable' : 'available'
        };
      }
      return item;
    }));
  };

  const handleDeleteListing = (itemId) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      setListings(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalEarnings = listings.reduce((sum, item) => sum + (item.earnings || 0), 0);
  const availableCount = listings.filter(item => item.status === 'available').length;
  const rentedCount = listings.filter(item => item.status === 'rented').length;

  return (
    <div className="lender-listings-wrapper">
      <div className="container">

        {/* Page Header */}
        <div className="listings-header-row">
          <div>
            <span className="section-kicker">INVENTORY MANAGEMENT</span>
            <h1 className="page-title font-display">My Equipment Listings</h1>
            <p className="page-subtitle">
              Manage all your listed gear, toggle availability, and track performance metrics.
            </p>
          </div>

          <Link to="/lender/add-item" className="btn btn-yellow">
            <PlusCircle size={16} />
            <span>Add New Item</span>
          </Link>
        </div>

        {/* Stats Summary Bar */}
        <div className="listings-stats-bar card-brutal">
          <div className="stat-pill">
            <Package size={18} />
            <span className="stat-pill-value font-display">{listings.length}</span>
            <span className="stat-pill-label">Total Listed</span>
          </div>

          <div className="stat-pill">
            <ToggleRight size={18} color="#059669" />
            <span className="stat-pill-value font-display">{availableCount}</span>
            <span className="stat-pill-label">Available Now</span>
          </div>

          <div className="stat-pill">
            <TrendingUp size={18} color="#7C3AED" />
            <span className="stat-pill-value font-display">{rentedCount}</span>
            <span className="stat-pill-label">Rented Out</span>
          </div>

          <div className="stat-pill">
            <DollarSign size={18} color="#059669" />
            <span className="stat-pill-value font-display">₹{totalEarnings.toFixed(0)}</span>
            <span className="stat-pill-label">Total Earned</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="listings-filters-bar">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by equipment name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <Filter size={16} />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="bicycle">Bicycles</option>
                <option value="academics">Academics</option>
                <option value="tools">Tools</option>
                <option value="clothes">Apparel</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            </div>

            <div className="filter-group">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="rented">Rented Out</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="loading-state">
            <Package size={42} className="text-muted" />
            <p className="text-muted">Loading your inventory...</p>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="listings-grid">
            {filteredListings.map((item) => {
              const isAvailable = item.status === 'available';
              const isRented = item.status === 'rented';

              return (
                <div key={item.id} className="listing-card-full card-brutal">

                  {/* Image Section */}
                  <div className="listing-card-image-wrap">
                    <img src={item.images[0]} alt={item.title} className="listing-card-image" />
                    <div className="listing-card-overlay-badges">
                      <span className={`badge ${isAvailable ? 'badge-available' : isRented ? 'badge-rented' : 'badge-unavailable'}`}>
                        {isAvailable ? 'Available' : isRented ? 'Rented Out' : 'Unavailable'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="listing-card-body">
                    <div className="listing-card-header">
                      <span className="listing-category-tag">{item.category.toUpperCase()}</span>
                      <h3 className="listing-card-title font-bold">{item.title}</h3>
                    </div>

                    <div className="listing-card-meta">
                      <div className="meta-item">
                        <DollarSign size={14} />
                        <span className="font-bold">₹{item.pricePerDay}/day</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={14} />
                        <span className="text-xs">{item.location}</span>
                      </div>
                    </div>

                    <div className="listing-card-stats">
                      <div className="stat-item">
                        <span className="stat-value font-display">₹{item.earnings || 0}</span>
                        <span className="stat-label">Earned</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value font-display">{item.totalRentals || 0}</span>
                        <span className="stat-label">Rentals</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value font-display">{item.views || 0}</span>
                        <span className="stat-label">Views</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="listing-card-actions">
                      <Link to={`/equipment/${item.id}`} className="btn btn-outline btn-sm">
                        <Eye size={14} />
                        <span>View</span>
                      </Link>

                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleToggleAvailability(item.id)}
                        title={isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
                      >
                        {isAvailable ? <ToggleRight size={14} color="#059669" /> : <ToggleLeft size={14} />}
                      </button>

                      <button
                        className="btn btn-outline btn-sm btn-danger"
                        onClick={() => handleDeleteListing(item.id)}
                        title="Delete Listing"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state card-brutal">
            {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all' ? (
              <>
                <AlertCircle size={42} className="text-muted" />
                <h3 className="font-bold text-lg">No listings match your filters</h3>
                <p className="text-sm text-secondary">Try adjusting your search or filters.</p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  Clear All Filters
                </button>
              </>
            ) : (
              <>
                <Package size={42} className="text-muted" />
                <h3 className="font-bold text-lg">No equipment listed yet</h3>
                <p className="text-sm text-secondary">
                  Start earning passive income by listing your spare cameras, calculators, bikes, or lab tools!
                </p>
                <Link to="/lender/add-item" className="btn btn-yellow">
                  <PlusCircle size={16} />
                  <span>List Your First Item</span>
                </Link>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
