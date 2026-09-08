import React from "react";
import FieldCard from "../../components/FieldCard/FieldCard";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import FilterModal from "../../components/FilterModal/FilterModal";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import LocationsMap from "../../components/LocationsMap/LocationsMap";
import { useLocations } from "../../hooks/useLocations";
import "./Locations.css";
import filterIcon from "../../../public/assets/images/filter.svg";
import searchIcon from "../../../public/assets/images/search.svg";

const Locations = React.memo(() => {
  const {
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    appliedMaxPrice,
    appliedMinSize,
    setAppliedMaxPrice,
    setAppliedMinSize,
    isFilterOpen,
    setIsFilterOpen,
    selectedFieldForCheckout,
    setIsCheckoutModalOpen,
    isCheckoutModalOpen,
    defaultCenter,
    filteredAndSortedFields,
    checkoutPriceNum,
    handleInvestClick,
    handleConfirmPayment,
    handleReserveClick,
  } = useLocations();

  return (
    <main className="locationsPage">
      <div className="locationsHeader">
        <h1 className="locationsTitle">Locations</h1>
        <div className="searchBarWrapper">
          <img
            src={searchIcon}
            alt=""
            className="searchIcon"
            aria-hidden="true"
          />
          <input
            type="text"
            className="locationsSearchInput"
            placeholder="Search by city, country, village places"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search locations"
          />
        </div>
      </div>

      <div className="locationsContentLayout">
        <div className="locationsLeftColumn">
          <div className="locationsToolbar">
            <div className="toolbarLeft">
              <SortDropdown sortBy={sortBy} onSelectSort={setSortBy} />
            </div>
            <div className="toolbarRight">
              <button
                className="filterBtn"
                onClick={() => setIsFilterOpen(true)}
              >
                Filter
                <img
                  src={filterIcon}
                  className="filterIcon"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="locationsListSection">
            {isLoading && <p>Loading locations...</p>}
            {isError && <p>Error loading locations.</p>}

            {!isLoading && !isError && (
              <>
                {filteredAndSortedFields.length === 0 ? (
                  <p className="noResultsText">
                    No locations match your criteria.
                  </p>
                ) : (
                  <div className="locationsGrid">
                    {filteredAndSortedFields.map((field) => (
                      <FieldCard
                        key={field.id}
                        field={field}
                        onInvest={() => handleInvestClick(field)}
                        onReserve={() => handleReserveClick(field.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <LocationsMap
          fields={filteredAndSortedFields}
          defaultCenter={defaultCenter}
        />
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

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleConfirmPayment}
        title="Invest in Plot"
        subtitle={
          selectedFieldForCheckout
            ? `You are investing in ${selectedFieldForCheckout.title} for €${selectedFieldForCheckout.price}`
            : ""
        }
        totalAmount={checkoutPriceNum}
      />
    </main>
  );
});

export default Locations;
