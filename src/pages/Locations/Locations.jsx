import FieldCard from "../../components/FieldCard/FieldCard";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import FilterModal from "../../components/FilterModal/FilterModal";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import LocationsMap from "../../components/LocationsMap/LocationsMap";
import { useLocations } from "../../hooks/useLocations";
import "./Locations.css";
import filterIcon from "../../../public/assets/images/filter.svg";
import searchIcon from "../../../public/assets/images/search.svg";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Locations = () => {
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
    <div className="locationsPage">
      <div className="locationsHeader">
        <h1 className="locationsTitle">Locations</h1>
        <div className="searchBarWrapper">
          <img src={searchIcon} alt="searchIcon" className="searchIcon" />
          <input
            type="text"
            className="locationsSearchInput"
            placeholder="Search by city, country, village places"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                <img src={filterIcon} className="filterIcon" alt="Filter" />
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
    </div>
  );
};

export default Locations;
