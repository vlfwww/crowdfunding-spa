import { useShop } from "../../hooks/useShop";
import FieldCard from "../../components/FieldCard/FieldCard";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import FilterModal from "../../components/FilterModal/FilterModal";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import MapModal from "../../components/MapModal/MapModal";
import "./Shop.css";
import filterIcon from "../../../public/assets/images/filter.svg";
import mapIcon from "../../../public/assets/images/map-pin.svg";

const Shop = () => {
  const {
    isLoading,
    isError,
    sortBy,
    setSortBy,
    appliedMaxPrice,
    appliedMinSize,
    setAppliedMaxPrice,
    setAppliedMinSize,
    isFilterOpen,
    setIsFilterOpen,
    isMapOpen,
    setIsMapOpen,
    selectedFieldForCheckout,
    setSelectedFieldForCheckout,
    filteredAndSortedFields,
    handleInvest,
    handleReserve,
    handleConfirmSinglePayment,
    singlePriceNum,
  } = useShop();

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

          <button className="mapBtn" onClick={() => setIsMapOpen(true)}>
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

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        fields={filteredAndSortedFields}
        onInvest={handleInvest}
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

      <CheckoutModal
        isOpen={Boolean(selectedFieldForCheckout)}
        onClose={() => setSelectedFieldForCheckout(null)}
        onConfirm={handleConfirmSinglePayment}
        title="Invest in Plot"
        subtitle={
          selectedFieldForCheckout
            ? `You are investing in ${selectedFieldForCheckout.title} for €${selectedFieldForCheckout.price}`
            : ""
        }
        totalAmount={singlePriceNum}
      />
    </div>
  );
};

export default Shop;
