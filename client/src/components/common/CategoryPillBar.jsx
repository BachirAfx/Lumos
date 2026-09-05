import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockData';
import './CategoryPillBar.css';

export const CategoryPillBar = ({ activeCategory, onSelectCategory, navigateOnClick = false }) => {
  const navigate = useNavigate();

  const handleClick = (catId) => {
    if (navigateOnClick) {
      navigate(`/explore?category=${encodeURIComponent(catId)}`);
    } else if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  return (
    <div className="category-pill-wrapper">
      <div className="category-pill-container">
        {CATEGORIES.map((cat) => {
          const isSelected = !navigateOnClick && activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-pill-item ${isSelected ? 'active' : ''}`}
              onClick={() => handleClick(cat.id)}
              style={{backgroundColor:cat.color}}
            >
              <div className="category-icon-frame">
                <img src={cat.icon} alt={cat.name} className="category-svg-icon" />
              </div>
              <span className="category-label-text">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
