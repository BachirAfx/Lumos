import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllEquipment } from '../../services/api';
import { CategoryPillBar, EquipmentCard, BorrowModal } from '../../components/common';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Package
} from 'lucide-react';
import './ExplorePage.css';

export const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('rating');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedEquipmentForBorrow, setSelectedEquipmentForBorrow] = useState(null);

  // Sync category & search from URL search params
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    setSelectedCategory(cat);
    setSearchQuery(search);
  }, [searchParams]);

  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      try {
        const filters = {
          category: selectedCategory,
          search: searchQuery,
          sortBy: sortBy,
          status: onlyAvailable ? 'available' : undefined
        };
        const response = await getAllEquipment(filters);
        if (response.success) {
          let list = response.data;
          if (maxPrice < 500) {
            list = list.filter(item => item.pricePerDay <= maxPrice);
          }
          setEquipmentList(list);
        }
      } catch (err) {
        console.error('Failed to load equipment:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [selectedCategory, searchQuery, sortBy, onlyAvailable, maxPrice]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set('search', searchQuery.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('rating');
    setOnlyAvailable(false);
    setMaxPrice(500);
    setSearchParams({});
  };

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (onlyAvailable ? 1 : 0) +
    (maxPrice < 500 ? 1 : 0);

  return (
    <div className="explore-page-wrapper">
      <div className="container">

        {/* Page Header */}
        <div className="explore-header-row">
          <div>
            <span className="section-kicker">CAMPUS INVENTORY</span>
            <h1 className="explore-title">Explore Available Campus Gear</h1>
            <p className="explore-sub">
              Browse equipment available for immediate dorm & lab pickup across campus.
            </p>
          </div>

          {/* Search Bar */}
          <form className="explore-search-bar" onSubmit={handleSearchSubmit}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search gear by name, model, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="explore-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('search');
                  setSearchParams(newParams);
                }}
              >
                <X size={14} />
              </button>
            )}
          </form>
        </div>

        {/* Category Pills Bar */}
        <div className="explore-categories-box">
          <CategoryPillBar
            activeCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Filters & Sort Controls Bar */}
        <div className="controls-bar">
          <div className="controls-left">
            <div className="filter-badge-item">
              <SlidersHorizontal size={16} />
              <span className="filter-label-text">Filter:</span>
            </div>

            {/* Toggle Available Only */}
            <label className="checkbox-toggle-label">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="custom-checkbox"
              />
              <span className="toggle-text">Available Now Only</span>
            </label>

            {/* Max Price Slider */}
            <div className="price-slider-group">
              <span className="slider-label">Max: <strong>₹{maxPrice}/day</strong></span>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range-slider"
              />
            </div>
          </div>

          <div className="controls-right">
            {/* Active Filters Clear Button */}
            {activeFiltersCount > 0 && (
              <button type="button" className="clear-filters-btn" onClick={clearAllFilters}>
                <X size={14} />
                <span>Reset Filters ({activeFiltersCount})</span>
              </button>
            )}

            {/* Sort Dropdown */}
            <div className="sort-dropdown-group">
              <ArrowUpDown size={14} className="sort-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="rating">Top Rated First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* OUTER PAPER CONTAINER: Cohesive Stationery Box around Equipment Grid */}
        <div className="browse-inventory-box">
          {/* Results Counter */}
          <div className="results-count-row">
            <span className="results-count-text">
              Showing <strong>{equipmentList.length}</strong> equipment item{equipmentList.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Equipment Grid */}
          {loading ? (
            <div className="equipment-cards-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <div key={n} className="skeleton-card">
                  <div className="skeleton-thumb"></div>
                  <div className="skeleton-body">
                    <div className="skeleton-line" style={{ width: '40%' }}></div>
                    <div className="skeleton-line" style={{ width: '80%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : equipmentList.length > 0 ? (
            <div className="equipment-cards-grid">
              {equipmentList.map((item) => (
                <EquipmentCard
                  key={item.id}
                  equipment={item}
                  onBorrowClick={(eq) => setSelectedEquipmentForBorrow(eq)}
                />
              ))}
            </div>
          ) : (
            <div className="no-equipment-found">
              <Package size={48} className="empty-package-icon" />
              <h3 className="empty-title">No gear found matching your criteria</h3>
              <p className="empty-sub">
                Try adjusting your price range, clearing filters, or submit a request on the community need board!
              </p>
              <div className="empty-actions">
                <button type="button" className="btn btn-outline" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
                <Link to="/request-equipment" className="btn btn-primary">
                  Post Equipment Request
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Borrow Modal */}
      <BorrowModal
        equipment={selectedEquipmentForBorrow}
        isOpen={!!selectedEquipmentForBorrow}
        onClose={() => setSelectedEquipmentForBorrow(null)}
        onSuccess={() => {
          getAllEquipment({ category: selectedCategory, search: searchQuery }).then(res => {
            if (res.success) setEquipmentList(res.data);
          });
        }}
      />
    </div>
  );
};
