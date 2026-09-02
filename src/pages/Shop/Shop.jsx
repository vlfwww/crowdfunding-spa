import { useState, useMemo, useEffect, useRef } from "react";
import FieldCard from "../../components/FieldCard/FieldCard";
import "./Shop.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import dropdownIcon from "../../../public/assets/images/dropdown-arrow.svg";
import filterIcon from "../../../public/assets/images/filter.svg";
import mapIcon from "../../../public/assets/images/map-pin.svg";
import { useGetFieldsQuery } from "../../store/api/shopApi";

const Shop = () => {
  const { data: fields = [], isLoading, isError } = useGetFieldsQuery();

  const [sortBy, setSortBy] = useState("all");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortRef = useRef(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [appliedMaxPrice, setAppliedMaxPrice] = useState(300);
  const [appliedMinSize, setAppliedMinSize] = useState(0);

  const [tempMaxPrice, setTempMaxPrice] = useState(300);
  const [tempMinSize, setTempMinSize] = useState(0);

  const filterModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  const sortLabels = {
    all: "All",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    title: "Title (A-Z)",
    size: "Size (Largest)",
  };

  const filteredAndSortedFields = useMemo(() => {
    const filtered = fields.filter((field) => {
      const priceNum = parseFloat(field.price.replace(",", "."));
      const sizeNum = parseInt(field.size);

      const matchesPrice = priceNum <= appliedMaxPrice;
      const matchesSize = sizeNum >= appliedMinSize;

      return matchesPrice && matchesSize;
    });

    const fieldsCopy = [...filtered];

    if (sortBy === "price-asc") {
      return fieldsCopy.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(",", "."));
        const priceB = parseFloat(b.price.replace(",", "."));
        return priceA - priceB;
      });
    }

    if (sortBy === "price-desc") {
      return fieldsCopy.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(",", "."));
        const priceB = parseFloat(b.price.replace(",", "."));
        return priceB - priceA;
      });
    }

    if (sortBy === "title") {
      return fieldsCopy.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "size") {
      return fieldsCopy.sort((a, b) => {
        const sizeA = parseInt(a.size);
        const sizeB = parseInt(b.size);
        return sizeB - sizeA;
      });
    }

    return fieldsCopy;
  }, [fields, sortBy, appliedMaxPrice, appliedMinSize]);

  const handleInvest = (id) => {
    console.log(`Invest in field ID: ${id}`);
  };

  const handleReserve = (id) => {
    console.log(`Reserve field ID: ${id}`);
  };

  const handleSelectSort = (type) => {
    setSortBy(type);
    setIsSortDropdownOpen(false);
  };

  const handleOpenFilter = () => {
    setTempMaxPrice(appliedMaxPrice);
    setTempMinSize(appliedMinSize);
    setIsFilterOpen(true);
  };

  const handleApplyFilters = () => {
    setAppliedMaxPrice(tempMaxPrice);
    setAppliedMinSize(tempMinSize);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setTempMaxPrice(300);
    setTempMinSize(0);
    setAppliedMaxPrice(300);
    setAppliedMinSize(0);
    setIsFilterOpen(false);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <>
      <Header />
      <div className="shopPage">
        <div className="shopHeader">
          <span className="shopTab">Invest</span>

          <div className="controlsPanel">
            <div className="sortDropdownWrapper" ref={sortRef}>
              <button
                className="sortControl"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                Sort by <span className="sortValue">{sortLabels[sortBy]}</span>{" "}
                <img
                  src={dropdownIcon}
                  className={`dropdownIcon ${isSortDropdownOpen ? "open" : "closed"}`}
                  alt="Sort"
                />
              </button>

              {isSortDropdownOpen && (
                <div className="sortMenuDropdown">
                  <div onClick={() => handleSelectSort("all")}>All</div>
                  <div onClick={() => handleSelectSort("price-asc")}>
                    Price: Low to High
                  </div>
                  <div onClick={() => handleSelectSort("price-desc")}>
                    Price: High to Low
                  </div>
                  <div onClick={() => handleSelectSort("title")}>
                    Title (A-Z)
                  </div>
                  <div onClick={() => handleSelectSort("size")}>
                    Size (Largest)
                  </div>
                </div>
              )}
            </div>

            <button className="filterBtn" onClick={handleOpenFilter}>
              Filter
              <img src={filterIcon} className="filterIcon" alt="Filter" />
            </button>

            <button className="mapBtn">
              <img src={mapIcon} className="mapIcon" alt="Map" />
              Map
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="filterModalOverlay" onClick={handleCloseFilter}>
            <div
              className="filterModalContent"
              ref={filterModalRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="closeModalBtn" onClick={handleCloseFilter}>
                &times;
              </button>

              <h3>Filter Fields</h3>

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
                <button className="resetFilterBtn" onClick={handleResetFilters}>
                  Reset
                </button>
                <button className="applyFilterBtn" onClick={handleApplyFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading && <p>Loading fields...</p>}
        {isError && <p>Error loading fields.</p>}

        {!isLoading && !isError && (
          <>
            {filteredAndSortedFields.length === 0 ? (
              <p className="noResultsText">
                No fields match your filter criteria.
              </p>
            ) : (
              <div className="fieldsGrid">
                {filteredAndSortedFields.map((field) => (
                  <FieldCard
                    key={field.id}
                    field={field}
                    onInvest={handleInvest}
                    onReserve={handleReserve}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
