import React, { useState, useEffect, useCallback } from "react";
import dropdownIcon from "../../../public/assets/images/dropdown-arrow.svg";
import "./SortDropdown.css";

const sortLabels = {
  all: "All",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  title: "Title (A-Z)",
  size: "Size (Largest)",
};

const SortDropdown = React.memo(({ sortBy, onSelectSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (type) => {
      onSelectSort(type);
      setIsOpen(false);
    },
    [onSelectSort],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="sortDropdownWrapper" ref={sortRef}>
      <button
        className="sortControl"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        Sort by <span className="sortValue">{sortLabels[sortBy] || "All"}</span>{" "}
        <img
          src={dropdownIcon}
          className={`dropdownIcon ${isOpen ? "open" : "closed"}`}
          alt=""
        />
      </button>

      {isOpen && (
        <div className="sortMenuDropdown">
          {Object.entries(sortLabels).map(([key, label]) => (
            <div
              key={key}
              className={`sortMenuItem ${sortBy === key ? "active" : ""}`}
              onClick={() => handleSelect(key)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default SortDropdown;
