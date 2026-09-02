import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import FieldCard from "../../components/FieldCard/FieldCard";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import FilterModal from "../../components/FilterModal/FilterModal";
import "./Locations.css";
import filterIcon from "../../../public/assets/images/filter.svg";
import searchIcon from "../../../public/assets/images/search.svg";
import { useGetFieldsQuery } from "../../store/api/shopApi";

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
  const { data: fields = [], isLoading, isError } = useGetFieldsQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(300);
  const [appliedMinSize, setAppliedMinSize] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const defaultCenter = [51.1657, 10.4515];

  const filteredAndSortedFields = useMemo(() => {
    const filtered = fields.filter((field) => {
      const priceNum = parseFloat(field.price.replace(",", "."));
      const sizeNum = parseInt(field.size);

      const matchesPrice = priceNum <= appliedMaxPrice;
      const matchesSize = sizeNum >= appliedMinSize;
      const matchesSearch =
        field.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.location?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPrice && matchesSize && matchesSearch;
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
  }, [fields, sortBy, appliedMaxPrice, appliedMinSize, searchQuery]);

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
          <button className="searchSubmitBtn">Search</button>
        </div>
      </div>

      <div className="locationsToolbar">
        <div className="toolbarLeft">
          <SortDropdown sortBy={sortBy} onSelectSort={setSortBy} />
        </div>
        <div className="toolbarRight">
          <button className="filterBtn" onClick={() => setIsFilterOpen(true)}>
            Filter
            <img src={filterIcon} className="filterIcon" alt="Filter" />
          </button>
        </div>
      </div>

      <div className="locationsContentLayout">
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
                      onInvest={(id) => console.log(`Invest ${id}`)}
                      onReserve={(id) => console.log(`Reserve ${id}`)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="locationsMapSection">
          <MapContainer
            center={defaultCenter}
            zoom={5}
            scrollWheelZoom={false}
            className="leafletMapContainer"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredAndSortedFields.map((field) => {
              if (!field.lat || !field.lng) return null;

              return (
                <Marker key={field.id} position={[field.lat, field.lng]}>
                  <Popup>
                    <div className="mapPopupContent">
                      <strong>{field.title}</strong>
                      <p>{field.location}</p>
                      <span>€{field.price}</span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
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
    </div>
  );
};

export default Locations;
