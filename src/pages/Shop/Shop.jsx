import { useState, useMemo } from "react";
import FieldCard from "../../components/FieldCard/FieldCard";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import FilterModal from "../../components/FilterModal/FilterModal";
import "./Shop.css";
import filterIcon from "../../../public/assets/images/filter.svg";
import mapIcon from "../../../public/assets/images/map-pin.svg";
import { useGetFieldsQuery } from "../../store/api/shopApi";

const Shop = () => {
  const { data: fields = [], isLoading, isError } = useGetFieldsQuery();

  const [sortBy, setSortBy] = useState("all");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(300);
  const [appliedMinSize, setAppliedMinSize] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAndSortedFields = useMemo(() => {
    const filtered = fields.filter((field) => {
      const priceNum = parseFloat(field.price.replace(",", "."));
      const sizeNum = parseInt(field.size);

      return priceNum <= appliedMaxPrice && sizeNum >= appliedMinSize;
    });

    const fieldsCopy = [...filtered];

    if (sortBy === "price-asc") {
      return fieldsCopy.sort(
        (a, b) =>
          parseFloat(a.price.replace(",", ".")) -
          parseFloat(b.price.replace(",", ".")),
      );
    }
    if (sortBy === "price-desc") {
      return fieldsCopy.sort(
        (a, b) =>
          parseFloat(b.price.replace(",", ".")) -
          parseFloat(a.price.replace(",", ".")),
      );
    }
    if (sortBy === "title") {
      return fieldsCopy.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "size") {
      return fieldsCopy.sort((a, b) => parseInt(b.size) - parseInt(a.size));
    }

    return fieldsCopy;
  }, [fields, sortBy, appliedMaxPrice, appliedMinSize]);

  const handleInvest = (id) => console.log(`Invest in field ID: ${id}`);
  const handleReserve = (id) => console.log(`Reserve field ID: ${id}`);

  return (
    <div className="shopPage">
      <div className="shopHeader">
        <span className="shopTab">Invest</span>

        <div className="controlsPanel">
          <SortDropdown sortBy={sortBy} onSelectSort={setSortBy} />

          <button className="filterBtn" onClick={() => setIsFilterOpen(true)}>
            Filter
            <img src={filterIcon} className="filterIcon" alt="Filter" />
          </button>

          <button className="mapBtn">
            <img src={mapIcon} className="mapIcon" alt="Map" />
            Map
          </button>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        appliedMaxPrice={appliedMaxPrice}
        appliedMinSize={appliedMinSize}
        onApplyFilters={(max, min) => {
          setAppliedMaxPrice(max);
          setAppliedMinSize(min);
        }}
        onResetFilters={() => {
          setAppliedMaxPrice(300);
          setAppliedMinSize(0);
        }}
      />

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
  );
};

export default Shop;
