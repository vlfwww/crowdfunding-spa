import { useState, useEffect, useCallback } from "react";
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleApply = useCallback(() => {
    onApplyFilters(tempMaxPrice, tempMinSize);
    onClose();
  }, [tempMaxPrice, tempMinSize, onApplyFilters, onClose]);

  const handleReset = useCallback(() => {
    setTempMaxPrice(300);
    setTempMinSize(0);
    onResetFilters();
    onClose();
  }, [onResetFilters, onClose]);

  if (!isOpen) return null;

  return (
    <div className="filterModalOverlay" onClick={onClose}>
      <div className="filterModalContent" onClick={(e) => e.stopPropagation()}>
        <button
          className="closeModalBtn"
          onClick={onClose}
          aria-label="Close filters modal"
        >
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
