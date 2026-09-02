import { useState, useEffect, useRef } from "react";
import dropdownIcon from "../../../public/assets/images/dropdown-arrow.svg";
import "./SortDropdown.css";

const SortDropdown = ({ sortBy, onSelectSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortLabels = {
    all: "All",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    title: "Title (A-Z)",
    size: "Size (Largest)",
  };

  const handleSelect = (type) => {
    onSelectSort(type);
    setIsOpen(false);
  };

  return (
    <div className="sortDropdownWrapper" ref={sortRef}>
      <button className="sortControl" onClick={() => setIsOpen(!isOpen)}>
        Sort by <span className="sortValue">{sortLabels[sortBy]}</span>{" "}
        <img
          src={dropdownIcon}
          className={`dropdownIcon ${isOpen ? "open" : "closed"}`}
          alt="Sort"
        />
      </button>

      {isOpen && (
        <div className="sortMenuDropdown">
          <div onClick={() => handleSelect("all")}>All</div>
          <div onClick={() => handleSelect("price-asc")}>
            Price: Low to High
          </div>
          <div onClick={() => handleSelect("price-desc")}>
            Price: High to Low
          </div>
          <div onClick={() => handleSelect("title")}>Title (A-Z)</div>
          <div onClick={() => handleSelect("size")}>Size (Largest)</div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
