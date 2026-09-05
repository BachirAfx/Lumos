import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEquipment } from '../../services/api';
import {
  CategoryPillBar,
  EquipmentCard,
  BorrowModal,
  CantFindBanner
} from '../../components/common';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import './HomePage.css';

export const HomePage = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEquipmentForBorrow, setSelectedEquipmentForBorrow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const eqRes = await getAllEquipment();
        if (eqRes.success) setEquipmentList(eqRes.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="home-page-wrapper">

      {/* =========================================================================
          SEARCH BAR SECTION
          ========================================================================= */}
      <section className="search-section">
        <div className="container">
          <form className="main-search-box" onSubmit={handleSearchSubmit}>
            <Search size={20} className="main-search-icon" />
            <input
              type="text"
              placeholder="Search for cameras, tools, audio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="main-search-input"
            />
          </form>
        </div>
      </section>

      {/* =========================================================================
          BROWSE BY CATEGORY
          ========================================================================= */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-heading section-heading--left">Browse by Category</h2>
          <CategoryPillBar navigateOnClick />
        </div>
      </section>

      {/* =========================================================================
          NEWLY LISTED NEAR YOU
          ========================================================================= */}
      <section className="featured-gear-section torn-section">
        <div className="container">
          <div className="section-header-row">
            <div className="section-header-left">
              <h2 className="section-heading section-heading--left">Newly listed near you</h2>
              <span className="location-badge">
                <MapPin size={12} />
                Within 5 Km
              </span>
            </div>
            <div className="section-header-right">
              <span className="sort-label">Sort by</span>
              <div className="sort-select-wrapper">
                <select className="sort-select" defaultValue="newest">
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={14} className="sort-chevron" />
              </div>
            </div>
          </div>

          <div className="equipment-grid-container">
            {loading ? (
              <div className="loading-state-grid">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="skeleton-card card">
                    <div className="skeleton-thumb"></div>
                    <div className="skeleton-body">
                      <div className="skeleton-line" style={{ width: '80%' }}></div>
                      <div className="skeleton-line" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : equipmentList.length > 0 ? (
              <div className="equipment-cards-grid">
                {equipmentList.slice(0, 5).map((item) => (
                  <EquipmentCard
                    key={item.id}
                    equipment={item}
                    onBorrowClick={(eq) => setSelectedEquipmentForBorrow(eq)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-results-box">
                <p>No equipment found nearby.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          "CAN'T FIND WHAT YOU NEED?" BANNER
          ========================================================================= */}
      <section className="banner-section">
        <div className="container">
          <CantFindBanner />
        </div>
      </section>

      {/* =========================================================================
          MOSTLY RENTED
          ========================================================================= */}
      <section className="mostly-rented-section torn-section">
        <div className="container">
          <div className="section-header-row">
            <div className="section-header-left">
              <h2 className="section-heading section-heading--left">Mostly Rented</h2>
              <span className="location-badge">
                <MapPin size={12} />
                Within 5 Km
              </span>
            </div>
            <div className="section-header-right">
              <span className="sort-label">Sort by</span>
              <div className="sort-select-wrapper">
                <select className="sort-select" defaultValue="newest">
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="most-rented">Most Rented</option>
                </select>
                <ChevronDown size={14} className="sort-chevron" />
              </div>
            </div>
          </div>

          <div className="equipment-grid-container">
            {equipmentList.length > 0 && (
              <div className="equipment-cards-grid">
                {equipmentList.slice(0, 5).map((item) => (
                  <EquipmentCard
                    key={item.id}
                    equipment={item}
                    onBorrowClick={(eq) => setSelectedEquipmentForBorrow(eq)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQs SECTION
          ========================================================================= */}
      <section className="faq-section torn-section">
        <div className="container">
          <h2 className="section-heading">FAQs</h2>
          <p className="faq-subtitle">
            Check the most Frequently Asked Questions before posting. Also includes help on using the Community.
          </p>

          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                <span className="faq-q-text">Q. How do I return the equipment?</span>
              </div>
              <div className="faq-answer">
                <span className="faq-a-text">Return the equipment to the owner at the agreed time and location. Both parties can confirm the return through the platform.</span>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span className="faq-q-text">Q. What happens if I damage or lose the equipment?</span>
              </div>
              <div className="faq-answer">
                <span className="faq-a-text">Users are responsible for returning equipment in the same condition in which they received it. In case of damage or loss, the owner and borrower can resolve the issue according to the platform's policies.</span>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span className="faq-q-text">Q. Can I extend my rental period?</span>
              </div>
              <div className="faq-answer">
                <span className="faq-a-text">Yes, if the equipment hasn't been reserved by another user. You can send an extension request to the owner through the platform.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Borrow Modal for instant booking */}
      <BorrowModal
        equipment={selectedEquipmentForBorrow}
        isOpen={!!selectedEquipmentForBorrow}
        onClose={() => setSelectedEquipmentForBorrow(null)}
        onSuccess={() => {
          getAllEquipment().then(res => {
            if (res.success) setEquipmentList(res.data);
          });
        }}
      />

    </div>
  );
};
