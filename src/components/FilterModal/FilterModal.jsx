import { useState, useEffect, useRef } from "react";
import "./FilterModal.css";

const FilterModal = ({
  isOpen,
  onClose,
  appliedMaxPrice,
  appliedMinSize,
  onApplyFilters,
  onResetFilters,
}) => {
  const [tempMaxPrice, setTempMaxPrice] = useState(appliedMaxPrice);
  const [tempMinSize, setTempMinSize] = useState(appliedMinSize);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTempMaxPrice(appliedMaxPrice);
      setTempMinSize(appliedMinSize);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, appliedMaxPrice, appliedMinSize]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(tempMaxPrice, tempMinSize);
    onClose();
  };

  const handleReset = () => {
    setTempMaxPrice(300);
    setTempMinSize(0);
    onResetFilters();
    onClose();
  };

  return (
    <div className="filterModalOverlay" onClick={onClose}>
      <div
        className="filterModalContent"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="closeModalBtn" onClick={onClose}>
          &times;
        </button>

        <p>Filter Fields</p>

        <div className="filterGroup">
          <label>Max Price: €{tempMaxPrice}</label>
          <input
            type="range"
            min="50"
            max="300"
            step="5"
            value={tempMaxPrice}
            onChange={(e) => setTempMaxPrice(Number(e.target.value))}
          />
        </div>

        <div className="filterGroup">
          <label>Min Size: {tempMinSize} sqm</label>
          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={tempMinSize}
            onChange={(e) => setTempMinSize(Number(e.target.value))}
          />
        </div>

        <div className="filterActions">
          <button className="resetFilterBtn" onClick={handleReset}>
            Reset
          </button>
          <button className="applyFilterBtn" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
