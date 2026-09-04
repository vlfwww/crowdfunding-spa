import { useState, useMemo } from "react";
import FieldCard from "../../components/FieldCard/FieldCard";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import FilterModal from "../../components/FilterModal/FilterModal";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import MapModal from "../../components/MapModal/MapModal";
import "./Shop.css";
import filterIcon from "../../../public/assets/images/filter.svg";
import mapIcon from "../../../public/assets/images/map-pin.svg";
import { useGetFieldsQuery } from "../../store/api/shopApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleReserve, investPlot } from "../../store/userPlotsSlice";
import { useNotification } from "../../hooks/useNotification";

const Shop = () => {
  const { data: fields = [], isLoading, isError } = useGetFieldsQuery();

  const dispatch = useDispatch();
  const notify = useNotification();
  const { reservedIds } = useSelector((state) => state.userPlots);

  const [sortBy, setSortBy] = useState("all");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(300);
  const [appliedMinSize, setAppliedMinSize] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [selectedFieldForCheckout, setSelectedFieldForCheckout] =
    useState(null);

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

  const handleInvest = (id) => {
    const targetField = fields.find((f) => f.id === id);
    if (targetField) {
      setSelectedFieldForCheckout(targetField);
    }
  };

  const handleReserve = (id) => {
    const isCurrentlyReserved = reservedIds.includes(id);
    dispatch(toggleReserve(id));
    if (!isCurrentlyReserved) {
      notify("Plot reserved successfully!");
    } else {
      notify("Plot reservation canceled.");
    }
  };

  const handleConfirmSinglePayment = () => {
    if (!selectedFieldForCheckout) return;
    dispatch(investPlot(selectedFieldForCheckout.id));
    setSelectedFieldForCheckout(null);
    notify("Investment successfully completed!");
  };

  const singlePriceNum = selectedFieldForCheckout
    ? parseFloat(selectedFieldForCheckout.price.replace(",", ".")) || 0
    : 0;

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
